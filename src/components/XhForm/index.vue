<template>
  <div ref="xhuiFormDivRef" :class="['table-form', formClassName]">
    <el-form ref="xhuiFormRef" v-bind="getBindValue" :model="formModelRef">
      <el-row v-bind="row">
        <template v-for="(item, index) in getSchemas" :key="index">
          <FormItem v-if="!item.show" :form-model="formModelRef" :schema="item" :col="col">
            <template #[getSlotName(item)]="data">
              <slot v-if="hasSlot(item)" :name="getSlotName(item)" v-bind="data || {}"></slot>
            </template>
          </FormItem>
        </template>
      </el-row>
      <div style="margin: 0 auto; text-align: center; width: 100%">
        <FormAction />
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, useAttrs, useSlots, watch } from 'vue'
  import { formEmits, formProps } from './form'
  import { useFormState, useFormItem, useFormMethods } from './hooks'
  import FormItem from './form-item.vue'
  import FormAction from './form-action.vue'
  import { createFormContext } from './hooks/useFormContext'
  import { FormInstance, FormValidateCallback } from 'element-plus'

  const slots = useSlots()

  const xhuiFormDivRef = ref<HTMLElement>()

  const xhuiFormRef = ref<FormInstance>()

  const attrs = useAttrs()

  const props = defineProps(formProps)

  const emit = defineEmits(formEmits)

  const state = useFormState({
    props,
    attrs
  })

  const { formModelRef, getBindValue } = state

  const formItem = useFormItem(state, xhuiFormDivRef)

  const { getSchemas, col } = formItem

  const methods = useFormMethods({ state, emit })

  const instance = {
    ...props,
    ...state,
    ...methods,
    ...formItem
  }

  createFormContext(instance)

  /**
   * 获取插槽名称
   * @param item 插槽名称
   */
  const getSlotName = (item: any) => {
    const name = item.prop + 'FormItem'
    return name
  }

  /**
   * 是否有表单项插槽
   * @param item
   */
  const hasSlot = (item: any): boolean => {
    const name = getSlotName(item)
    const hasKeys = Object.keys(slots).some((x) => x === name)
    return hasKeys
  }

  watch(
    () => formModelRef,
    () => {
      emit('update:model', formModelRef.value)
    },
    {
      deep: true
    }
  )
  const validate = async (callback?: FormValidateCallback | undefined) => {
    if (!xhuiFormRef.value) return
    await xhuiFormRef.value.validate?.((valid, fields) => {
      callback?.(valid, fields)
    })
  }

  defineExpose({ validate })
</script>
<style lang="scss" scoped></style>

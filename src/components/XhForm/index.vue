<template>
  <el-form :class="['table-form', formClassName]" v-bind="getBindValue">
    <el-row v-bind="row">
      <template v-for="(item, index) in formSchemasRef" :key="index">
        <FormItem :form-model="formModelRef" :schema="item"
      /></template>
      <FormAction v-bind="showFormActionButtonGroup"></FormAction>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { unref, useAttrs } from 'vue'
  import { formProps } from './form'
  import { useFormState, useFormItemCol } from './hooks'
  import FormItem from './form-item.vue'
  import FormAction from './form-action.vue'

  const attrs = useAttrs()

  const props = defineProps(formProps)

  const { formModelRef, getBindValue, innerFormPropsRef } = useFormState({ props, attrs })

  const formSchemasRef = useFormItemCol(unref(innerFormPropsRef))
</script>
<style lang="scss" scoped></style>

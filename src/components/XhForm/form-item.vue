<template>
  <el-col v-bind="schemas.col">
    <el-form-item v-bind="schemas">
      <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schemas.prop]">
        <template v-for="(slotFn, slotName) in getComponentSlots" :key="slotName">
          <component :is="slotFn"></component> </template
      ></component>
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>
  import { isString } from '@/utils/is'
  import { useVModel } from '@vueuse/core'
  import { computed, defineProps, PropType } from 'vue'
  import { componentMap, FormItem } from './form-item'

  /** 目的是解决：类型实例化过深，且可能无限 */
  type FormItemType = FormItem

  const props = defineProps({
    formModel: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    schemas: { type: Object as PropType<FormItemType>, default: () => ({}) }
  })

  const emit = defineEmits(['update:formModel'])

  const modelValue = useVModel(props, 'formModel', emit)

  /**
   * 获取表单组件
   */
  const getComponent = computed(() => {
    const comp = props.schemas.component
    return isString(comp) ? componentMap[comp] : componentMap['ElInput']
  })

  /**
   * 获取表单组件属性
   */
  const getComponentProps = computed(() => {
    const { componentProps = {} } = props.schemas
    return componentProps
  })

  /**
   * 获取表单组件插槽
   */
  const getComponentSlots = computed(() => {
    const componentSlots = props.schemas.componentSlots ?? {}
    return componentSlots
  })
</script>
<style lang="scss" scoped></style>

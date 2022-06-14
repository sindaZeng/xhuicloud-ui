<template>
  <el-col v-bind="schemas.col">
    <el-form-item v-bind="schemas">
      <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schemas.prop]">
        <template v-for="(slotFn, slotName) in getComponentSlots" #[slotName]="slotData" :key="slotName">
          <component :is="slotFn?.(slotData) ?? slotFn" :key="slotName"></component>
        </template>
      </component>
    </el-form-item>
  </el-col>
</template>
<script setup lang="tsx">
  import { isFunction, isString } from '@/utils/is'
  import { useVModel } from '@vueuse/core'
  import { computed, defineProps, isVNode, PropType, unref } from 'vue'
  import { componentMap, ComponentSlotsType, CustomRender, FormItem, RenderParams } from './form-item'
  const props = defineProps({
    formModel: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    schemas: { type: Object as PropType<FormItem>, default: () => ({}) }
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
    return props.schemas.componentProps as Recordable
  })

  const getValues = computed<RenderParams>(() => {
    return {}
  })

  /**
   * 获取表单组件插槽
   */
  const getComponentSlots = computed<Recordable<CustomRender>>(() => {
    const componentSlots = props.schemas.componentSlots ?? {}
    return createVnode(componentSlots)
  })

  console.log(getComponentSlots)

  const createVnode = (component: ComponentSlotsType, renderParams: RenderParams = unref(getValues)): any => {
    if (isString(component)) {
      return <>{component}</>
    } else if (isVNode(component)) {
      return component
    } else if (isFunction(component)) {
      return createVnode((component as CustomRender)(renderParams))
    }
    return component
  }
</script>
<style lang="scss" scoped></style>

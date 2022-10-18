<template>
  <el-col v-bind="getCol">
    <el-form-item v-bind="schema">
      <slot :name="schema.prop + 'Form'" :form-model="formModel" :field="schema.prop">
        <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schema.prop]">
          <template v-for="(slotFn, slotName) in getComponentSlots" #[slotName]="slotData" :key="slotName">
            <component :is="slotFn?.(slotData) ?? slotFn" :key="slotName"></component>
          </template>
        </component>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script setup lang="tsx">
  import { isFunction, isNullOrUnDef, isString } from '@/utils/is'
  import { useVModel } from '@vueuse/core'
  import { ColProps } from 'element-plus'
  import { computed, defineProps, isVNode, PropType, unref } from 'vue'
  import { componentMap, ComponentSlotsType, CustomRender, FormItem, RenderParams } from './form-item'

  const props = defineProps({
    formModel: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    schema: { type: Object as PropType<FormItem>, default: () => ({}) },
    col: { type: Object as PropType<Partial<ColProps>>, default: () => ({}) }
  })
  const emit = defineEmits(['update:formModel'])

  const modelValue = useVModel(props, 'formModel', emit)

  const getCol = computed(() => {
    if (isNullOrUnDef(props.schema.col)) {
      return props.col
    }
    return props.schema.col
  })

  /**
   * 获取表单组件
   */
  const getComponent = computed(() => {
    const comp = props.schema.component
    return isNullOrUnDef(comp) ? componentMap['ElInput'] : isString(comp) ? componentMap[comp] : createVnode(comp)
  })

  /**
   * 获取表单组件属性
   */
  const getComponentProps = computed(() => {
    const { schema } = props
    let { componentProps = {} } = schema
    return componentProps as Recordable
  })

  /**
   * 属性
   */
  const getValues = computed<RenderParams>(() => {
    const { formModel, schema } = props
    return {
      formModel,
      field: schema.prop
    }
  })

  /**
   * 获取表单组件插槽
   */
  const getComponentSlots = computed<Recordable<CustomRender>>(() => {
    const componentSlots = props.schema.componentSlots ?? {}
    return createVnode(componentSlots)
  })

  /**
   * 创建组件节点
   */
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

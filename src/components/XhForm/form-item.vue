<template>
  <el-col v-bind="schemas.col">
    <el-form-item v-bind="schemas">
      <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schemas.prop]"></component>
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

  const getComponent = computed(() => {
    const comp = props.schemas.component
    return isString(comp) ? componentMap[comp] : componentMap['ElInput']
  })
  const getComponentProps = computed(() => {
    const { componentProps = {} } = props.schemas
    return componentProps
  })

  const emit = defineEmits(['update:formModel'])

  const modelValue = useVModel(props, 'formModel', emit)
</script>
<style lang="scss" scoped></style>

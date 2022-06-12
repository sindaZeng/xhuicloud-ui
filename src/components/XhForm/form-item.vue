<template>
  <el-col v-bind="schemas.col">
    <el-form-item v-bind="schemas">
      <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schemas.prop]" />
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>
  import { isString } from '@/utils/is'
  import { useVModel } from '@vueuse/core'
  import { computed, defineProps, PropType } from 'vue'
  import { componentMap, FormItem } from './form-item'

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
    return props.schemas.componentProps
  })
</script>
<style lang="scss" scoped></style>

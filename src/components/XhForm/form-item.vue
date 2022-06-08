<template>
  <el-col v-bind="schemas.col">
    <el-form-item v-bind="schemas">
      <component :is="getComponent" v-bind="getComponentProps" v-model="modelValue[schemas.prop]"></component>
    </el-form-item>
  </el-col>
</template>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import { defineProps } from 'vue'
  import { formItemProps } from './form-item'
  import { useFormItemState } from './hooks/useFormItemState'

  const props = defineProps(formItemProps)

  const { getComponent, getComponentProps } = useFormItemState(props)

  const emit = defineEmits(['update:formModel'])

  const modelValue = useVModel(props, 'formModel', emit)
</script>
<style lang="scss" scoped></style>

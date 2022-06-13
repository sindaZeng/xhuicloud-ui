<template>
  <el-input v-bind="$props" v-model="modelValue" />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useVModel } from '@vueuse/core'
  import { inputViewProps } from './inputProps'

  const props = defineProps(inputViewProps)

  const emit = defineEmits(['update:modelValue'])

  const modelValue = useVModel(props, 'modelValue', emit)
</script>
<style lang="scss" scoped></style>

<template>
  <el-checkbox-group v-bind="props" v-model="modelValue">
    <template v-for="(item, index) in options" :key="index">
      <el-checkbox v-bind="item">{{ item.value ? item.value : item.label }}</el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import checkboxGroupProps from '.'
  const props = defineProps(checkboxGroupProps)
  const emit = defineEmits(['update:modelValue'])
  const modelValue = useVModel(props, 'modelValue', emit)
</script>
<style lang="scss" scoped></style>

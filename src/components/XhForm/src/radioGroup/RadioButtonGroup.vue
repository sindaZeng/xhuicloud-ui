<template>
  <el-radio-group v-bind="props" v-model="radioValue">
    <template v-for="(item, index) in options" :key="index">
      <el-radio-button v-bind="item">{{ item.value ? item.value : item.label }}</el-radio-button>
    </template>
  </el-radio-group>
</template>
<script lang="ts" setup>
  import radioButtonGroupProps from '.'
  import { useVModel } from '@vueuse/core'
  const props = defineProps(radioButtonGroupProps)
  const emit = defineEmits(['update:modelValue'])
  const radioValue = useVModel(props, 'modelValue', emit)
</script>
<style lang="scss" scoped></style>

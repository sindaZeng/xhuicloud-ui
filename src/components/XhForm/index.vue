<template>
  <el-form :class="['table-form', formClassName]" v-bind="getBindValue">
    <el-row :gutter="4">
      <template v-for="(item, index) in formSchemasRef" :key="index">
        <FormItem :form-model="formModelRef" :schemas="item"
      /></template>
      <el-button type="primary" @click="log">搜索</el-button>
      <el-button type="primary">重置</el-button>
      <el-button type="primary" link
        >收起<el-icon class="el-icon--right"><ArrowUp /></el-icon
      ></el-button>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { ArrowUp } from '@element-plus/icons-vue'
  import { useAttrs } from 'vue'
  import { formProps } from './form'
  import { useFormState } from './hooks/useFormState'
  import FormItem from './form-item.vue'

  const attrs = useAttrs()

  const props = defineProps(formProps)

  const { formModelRef, getBindValue, formSchemasRef } = useFormState({ props, attrs })

  const log = () => {
    console.log(formModelRef)
  }
</script>
<style lang="scss" scoped></style>

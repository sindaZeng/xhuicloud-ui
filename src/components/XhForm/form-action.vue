<template>
  <!-- 表单操作栏组 -->
  <el-button type="primary" @click="log">搜索</el-button>
  <el-button type="primary">重置</el-button>
  <el-button v-if="showUpButton" type="primary" link @click="showUpButtonClick">
    收起
    <el-icon class="el-icon--right">
      <ArrowUp />
    </el-icon>
  </el-button>
</template>
<script lang="ts" setup>
  import {} from 'vue'
  import { ArrowUp } from '@element-plus/icons-vue'
  import { formActionButtonGroupProps } from './form-action'

  const props = defineProps(formActionButtonGroupProps)

  const log = () => {
    console.log()
  }

  const showUpButtonClick = () => {
    if (typeof props.showUpButton !== 'boolean') {
      props.showUpButton?.btFunc()
    }
  }
</script>
<style lang="scss" scoped></style>

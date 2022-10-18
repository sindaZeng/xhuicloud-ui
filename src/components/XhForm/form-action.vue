<template>
  <!-- 表单操作栏组 -->
  <el-button v-if="formActionButtonGroup?.showSearchButton" class="formActionBt" type="primary" @click="toSearch">{{
    $t('menu.Search')
  }}</el-button>
  <el-button v-if="formActionButtonGroup?.showResetButton" class="formActionBt" type="primary" @click="toReset">{{
    $t('menu.Reset')
  }}</el-button>
  <el-button
    v-if="formActionButtonGroup?.showShowUpButton && getSchemas.length > 3"
    class="formActionBt"
    type="primary"
    link
    @click="toShowUp"
  >
    {{ showUpRef ? $t('menu.Show') : $t('menu.Fold') }}
    <el-icon class="el-icon--right">
      <ArrowUp v-if="showUpRef" />
      <ArrowDown v-else />
    </el-icon>
  </el-button>
</template>
<script lang="ts" setup>
  import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
  import { useFormContext } from './hooks/useFormContext'

  const { showUpRef, toSearch, toReset, toShowUp, formActionButtonGroup, getSchemas } = useFormContext()
</script>
<style lang="scss" scoped>
  .formActionBt {
    margin-left: 20px;
  }
</style>

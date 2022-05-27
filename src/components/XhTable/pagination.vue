<template>
  <el-pagination v-bind="page" />
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { pageProps } from './pagination'
  defineProps(pageProps)
</script>
<style lang="scss" scoped></style>

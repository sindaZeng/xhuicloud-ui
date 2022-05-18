
<template>
  <div class=''>
    {{ page }}
    <el-button @click='handleSizeChange(1)'>handleSizeChange</el-button>
    <el-button @click='handleCurrentChange(2)'>handleCurrentChange</el-button>
  </div>
</template>

<script lang="ts" setup>

import { usePagination } from '@/components/XhTable/hooks/usePagination'

const { page, handleSizeChange, handleCurrentChange } = usePagination()
</script>

<style lang='scss' scoped>

</style>

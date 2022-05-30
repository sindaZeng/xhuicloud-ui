<template>
  <el-button v-if="permission.addBtn" type="primary" size="small" :icon="Plus">{{ $t(`button.create`) }} </el-button>
  <el-button v-if="permission.exportBtn" type="primary" size="small" :icon="Download"
    >{{ $t(`button.download`) }}
  </el-button>
  <el-button v-if="permission.importBtn" type="primary" size="small" :icon="Upload"
    >{{ $t(`button.upload`) }}
  </el-button>
  <el-button
    :icon="Refresh"
    style="float: right; margin-left: 12px"
    size="default"
    circle
    @click="table.onload"
  ></el-button>
  <el-button :icon="View" style="float: right" size="default" circle></el-button>
</template>

<script lang="ts" setup>
  import { Plus, Download, Upload, Refresh, View } from '@element-plus/icons-vue'
  import { computed } from 'vue'
  import { useTableContext } from './hooks'

  const table = useTableContext()
  const permission = computed(() => table.permission)
</script>
<style lang="scss" scoped></style>

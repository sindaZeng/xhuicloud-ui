<template>
  <el-button
    v-if="permission.addBtn"
    type="primary"
    size="small"
    :icon="Plus"
    @click="tableContext.openDialog('create', null)"
    >{{ $t(`button.create`) }}
  </el-button>
  <el-button v-if="permission.exportBtn" type="primary" size="small" :icon="Download"
    >{{ $t(`button.download`) }}
  </el-button>
  <el-button v-if="permission.importBtn" type="primary" size="small" :icon="Upload"
    >{{ $t(`button.upload`) }}
  </el-button>

  <template v-for="item in Object.keys($slots)" :key="item">
    <slot :name="item"></slot>
  </template>

  <el-button
    v-if="permission.refreshBtn !== false"
    :icon="Refresh"
    style="float: right; margin-left: 12px"
    size="default"
    circle
    @click="tableContext.onload"
  ></el-button>
  <el-button
    v-if="permission.viewBtn !== false"
    :icon="View"
    style="float: right"
    size="default"
    circle
    @click="tableContext.changeTableDrawer"
  ></el-button>
  <crud-style v-if="tableContext.tableDrawer.value"></crud-style>
</template>

<script lang="ts" setup>
  import { Plus, Download, Upload, Refresh, View } from '@element-plus/icons-vue'
  import { computed } from 'vue'
  import { useTableContext } from './hooks'
  import crudStyle from './crud-style.vue'

  const tableContext = useTableContext()

  const permission = computed(() => tableContext.permission)
</script>
<style lang="scss" scoped></style>

<template>
  <!--  右侧表格属性  -->
  <el-drawer v-model="table.tableDrawer.value" size="40%">
    <template #title>
      <h4>{{ $t(`table.attributes`) }}</h4>
    </template>
    <template #default>
      <el-divider content-position="left">表格属性</el-divider>
      <el-table ref="xhuiDrawerTableRef" :data="tableColumn" style="width: 100%">
        <el-table-column prop="label" :label="$t(`table.label`)" width="180" />
        <el-table-column prop="hidden" :label="$t(`table.hidden`)" width="180">
          <template #default="scope">
            <el-checkbox v-model="scope.row.hidden" name="type"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="fixed" :label="$t(`table.fixed`)" width="180">
          <template #default="scope">
            <el-checkbox v-model="scope.row.fixed" name="type"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="sortable" :label="$t(`table.sortable`)" width="180">
          <template #default="scope">
            <el-checkbox v-model="scope.row.sortable" name="type"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es'
  import { ref, watchEffect } from 'vue'
  import { TableColumn } from './crud'
  import { useTableContext } from './hooks'

  const table = useTableContext()
  const tableColumn = ref<TableColumn[]>(cloneDeep<TableColumn[]>(table.tableColumn))

  watchEffect(() => {
    table.setProps({ tableColumn: tableColumn.value })
  })
</script>
<style lang="scss" scoped></style>

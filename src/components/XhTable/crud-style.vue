<template>
  <!--  右侧表格属性  -->
  <el-drawer v-model="tableContext.tableDrawer.value" size="40%">
    <template #title>
      <h4>{{ $t(`table.attributes`) }}</h4>
    </template>
    <template #default>
      <el-divider content-position="left">字段属性</el-divider>
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
      <el-divider content-position="left">表格属性</el-divider>
      <div class="table-style-switch">
        边框:
        <el-switch v-model="table.border" />
      </div>
      <div class="table-style-switch">
        搜索栏:
        <el-switch v-model="enableSearch" />
      </div>
      <div class="table-style-switch">
        斑马纹:
        <el-switch v-model="table.stripe" />
      </div>
      <div class="table-style-switch">
        多选框:
        <el-switch v-model="table.selection" />
      </div>
      <div class="table-style-switch">
        固定表头:
        <el-switch v-model="height" />
      </div>
      <div class="table-style-switch">
        表格布局:
        <el-radio-group v-model="table.tableLayout">
          <el-radio-button label="fixed" />
          <el-radio-button label="auto" />
        </el-radio-group>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Table, TableColumn } from './crud'
  import { useTableContext } from './hooks'

  const height = ref<boolean>(false)

  const tableContext = useTableContext()

  const tableColumn = ref<TableColumn[]>(tableContext.getProps.value.tableColumn)

  const table = ref<Table<any>>(tableContext.getProps.value.table)

  const enableSearch = ref<boolean>(tableContext.getProps.value.enableSearch)

  watch(
    () => table,
    () => {
      tableContext.setProps({ table: table.value })
    },
    {
      deep: true
    }
  )

  watch(enableSearch, () => {
    tableContext.setProps({ enableSearch: enableSearch.value })
  })

  watch(
    () => tableColumn,
    (val) => {
      tableContext.setProps({ tableColumn: val.value })
    },
    {
      deep: true
    }
  )

  watch(height, (val) => {
    if (val) {
      table.value.height = document.getElementsByClassName('app-main')[0].clientHeight - 200
      tableContext.setProps({ table: table.value })
    }
  })
</script>
<style lang="scss" scoped>
  .table-style-switch {
    display: flex;
    width: 50%;
    justify-content: space-between;
  }
</style>

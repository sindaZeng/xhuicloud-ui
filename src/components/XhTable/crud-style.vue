<template>
  <!--  右侧表格属性  -->
  <el-drawer v-model="tableDrawer" size="40%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="字段属性" name="first">
        <el-table ref="xhDrawerTableRef" :data="tableColumn" style="width: 100%">
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
      </el-tab-pane>
      <el-tab-pane label="表格属性" name="second">
        <div class="table-style-switch">
          边框:
          <el-switch v-model="table.border" />
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
        <div class="table-style-switch">
          搜索栏:
          <el-switch v-model="showSearch" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { cloneDeep } from 'lodash'
  import { ref, watch, watchEffect } from 'vue'
  import { FormActionButtonGroupProps } from '../XhForm/form-action'
  import { Table, TableColumn } from './crud'
  import { useTableContext } from './hooks'

  const activeName = ref('first')

  const height = ref<boolean>(false)

  const { getProps, setProps, tableDrawer } = useTableContext()

  /** 目的是解决：类型实例化过深，且可能无限 */
  type TableColumnType = TableColumn & {
    search?: any
  }

  const defaultTableColumn = cloneDeep<TableColumnType[]>(getProps.value.tableColumn)

  const tableColumn = ref<TableColumnType[]>([])

  const table = ref<Table>(getProps.value.table)

  const enableSearch = ref<FormActionButtonGroupProps>(getProps.value.enableSearch)

  const showSearch = ref<boolean>(enableSearch.value.show!)

  const init = () => {
    tableColumn.value = defaultTableColumn.filter((x) => !x.isFormItem)
  }

  init()

  watch(
    () => table,
    () => {
      setProps({ table: table.value })
    },
    {
      deep: true
    }
  )

  watch(showSearch, () => {
    setProps({ enableSearch: { ...enableSearch.value, show: showSearch.value } })
  })

  watchEffect(() => {
    setProps({ tableColumn: tableColumn.value })
  })

  watch(height, (val) => {
    if (val) {
      table.value.height = document.getElementsByClassName('app-main')[0].clientHeight - 200
      setProps({ table: table.value })
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

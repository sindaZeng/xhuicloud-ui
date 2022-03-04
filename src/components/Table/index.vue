<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->

<template>
  <div class='table-body'>
    <!-- 表格搜索栏 -->
    <xhui-Card v-if='tableAttributes.enableSearch'>
      <div class='search-container'>
        <!--  搜索栏头部插槽    -->
        <slot name='searchTableHead' />
        <template v-for='(column, cIndex) in _tableAttributesColumns' :key='cIndex'>
          <el-date-picker v-model='searchForm[column.prop]'
                          v-if='column.search && (column.type === `datetime` || column.type === `date`)'
                          :type='column.type'
                          :value-format='column.valueFormat'
                          :placeholder='(column.search || {}).placeholder == undefined ? (column.search || {}).label : (column.search || {}).placeholder'
                          :clearable='(column.search || {}).clearable'
                          :size='(column.search || {}).size' />
          <el-input v-model='searchForm[column.prop]'
                    v-else-if='column.search'
                    :placeholder='(column.search || {}).placeholder == undefined ? column.label : (column.search || {}).placeholder'
                    :clearable='(column.search || {}).clearable'
                    :size='(column.search || {}).size' />
        </template>
        <el-button style='margin-left: 50px' type='primary'
                   :loading-icon='Eleme'
                   :icon='Search'
                   size='small'
                   :loading='searchLoading'
                   @click='getTableData'>
          {{ $t(`button.search`) }}
        </el-button>
        <!--  搜索栏尾部插槽    -->
        <slot name='searchTableTail' />
      </div>
    </xhui-Card>
    <!-- 表格  -->
    <xhui-Card>
      <div class='table-head' style='height: 50px;width: 100%;'>
        <el-button type='primary' size='small' :icon='Plus' v-if='props.handleToSave' @click='handleToSave'>{{ $t(`button.create`) }}</el-button>
        <el-button type='primary' size='small' :icon='Download'>{{ $t(`button.download`) }}</el-button>
        <el-button type='primary' size='small' :icon='Upload'>{{ $t(`button.upload`) }}</el-button>
        <slot name='tableHead' />
        <el-button :icon='Refresh' style='float: right;margin-right: 45px' size='default' @click='getTableData'
                   circle></el-button>
        <el-button :icon='View' style='float: right' size='default' @click='tableDrawer = !tableDrawer'
                   circle></el-button>
      </div>
      <div class='table-container'>
        <el-table
          ref='xhuiTable'
          :data='_tableData' style='width: 100%'>
          <template v-for='(column, cIndex) in _tableAttributesColumns' :key='cIndex'>
            <el-table-column
              v-if='!column.hidden'
              :fixed='column.fixed'
              :sortable='column.sortable'
              :column-key='cIndex'
              align='center'
              :prop='column.prop'
              :formatter='column.formatter'
              :label='column.label'
              :width="column.width || 'auto'">
            </el-table-column>
            <el-table-column
              v-if='tableAttributes.columns.length - 1 === cIndex
              &&
              tableAttributes.enableOperations'
              :label='$t(`button.operations`)'
              align='center'>
              <template #default='scope'>
                <el-button size='small' v-if='props.handleRowUpdate' :icon='Edit' @click='handleRowUpdate(scope.row)'>
                  {{ $t(`button.edit`) }}
                </el-button>
                <el-button size='small' v-if='props.handleRowDel' :icon='Delete' type='danger'
                           @click='handleRowDel(scope.row)'>
                  {{ $t(`button.del`) }}
                </el-button>
                <!-- 表格操作栏插槽 -->
                <slot name='tableOperation'/>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class='table-foot'>
        <el-pagination
          class='table-pagination'
          background
          v-if='_page'
          v-bind='$attrs'
          :layout='pageLayout'
          :page-sizes='pageSizes'
          :total='_page.total'
          v-model:current='_page.current'
          v-model:page-size='_page.size'
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'>
        </el-pagination>
      </div>
    </xhui-Card>
    <!--  右侧表格属性  -->
    <el-drawer v-model='tableDrawer' size='40%'>
      <template #title>
        <h4>{{ $t(`table.attributes`) }}</h4>
      </template>
      <template #default>
        <el-table
          ref='xhuiDrawerTable'
          :data='_tableAttributesColumns' style='width: 100%'>
          <el-table-column prop='label' :label='$t(`table.label`)' width='180' />
          <el-table-column prop='hidden' :label='$t(`table.hidden`)' width='180'>
            <template v-slot='scope'>
              <el-checkbox v-model='scope.row.hidden' name='type'></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop='fixed' :label='$t(`table.fixed`)' width='180'>
            <template v-slot='scope'>
              <el-checkbox v-model='scope.row.fixed' name='type'></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop='sortable' :label='$t(`table.sortable`)' width='180'>
            <template v-slot='scope'>
              <el-checkbox v-model='scope.row.sortable' name='type'></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
    <!--  新增/修改  -->
    <div class='createOrUpdateDialog'>
      <slot name='createOrUpdateDialog'>
        <el-dialog v-model='createOrUpdateDialog' :title='$t(`table.`+createOrUpdateDialogTitle+`Dialog`)' width='40%' :before-close="toClose" draggable>
          <el-form ref='createOrUpdateForm' :model='_formData' label-width='120px'>
            <template v-for='(column, cIndex) in _tableAttributesColumns' :key='cIndex'>
              <el-row :span='24' :gutter='5'>
                <template v-for='(xColumn, xIndex) in _tableAttributesColumns.slice(cIndex*2,cIndex*2+2)' :key='xIndex'>
                  <el-col :xl='12' :lg='12'>
                    <el-form-item :label='xColumn.label' v-if='!xColumn.editDisplay || !xColumn.createDisplay'>
                      <el-date-picker v-model='_formData[xColumn.prop]'
                                      v-if='(xColumn.type === `datetime` || column.type === `date`)'
                                      :type='xColumn.type'
                                      :value-format='xColumn.valueFormat'
                                      :clearable='(xColumn.search || {}).clearable' />
                      <el-input v-else v-model='_formData[xColumn.prop]'
                                :disabled='xColumn.createDisabled || xColumn.editDisabled'></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
          </el-form>
          <template #footer>
          <span class='dialog-footer'>
            <el-button @click='toClose'>Cancel</el-button>
            <el-button type='primary' @click='createOrUpdateDialogTitle === `edit` ? toUpdate() : toSave()'>Confirm</el-button>
          </span>
          </template>
        </el-dialog>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { isNull } from '@/utils/validate'
import { Edit, Delete, Search, Plus, Download, Upload, Refresh, View } from '@element-plus/icons-vue' //  element-plus@1.1.0-beta.24  @See: https://github.com/element-plus/element-plus/issues/2898 貌似有BUG 后续观望

const _tableData = ref([])

const _formData = ref({})

const searchForm = ref({})

const searchLoading = ref(false)

const tableDrawer = ref(false)

const createOrUpdateDialog = ref(false)

const createOrUpdateDialogTitle = ref('')

const props = defineProps({
  page: {
    type: Object,
    required: false
  },
  pageLayout: {
    type: String,
    default: 'total, sizes,  prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 30, 50]
    }
  },
  tableData: {
    type: Array,
    default: () => {
      return []
    }
  },
  tableAttributes: {
    type: Object,
    required: true
  },
  getTableData: {
    type: Function,
    required: false
  },
  handleToSave: {
    type: Function,
    required: false,
    default: null
  },
  handleRowDel: {
    type: Function,
    required: false,
    default: null
  },
  handleRowUpdate: {
    type: Function,
    required: false,
    default: null
  }
})

const _tableAttributesColumns = ref(props.tableAttributes.columns)

const getTableData = () => {
  searchLoading.value = !searchLoading.value
  props.getTableData({
    current: _page.value.current,
    size: _page.value.size
  }, searchForm).then(res => {
    _tableData.value = res
  })
  searchLoading.value = !searchLoading.value
}

const handleRowUpdate = row => {
  createOrUpdateDialog.value = !createOrUpdateDialog.value
  createOrUpdateDialogTitle.value = 'edit'
  _formData.value = row
}

const handleToSave = () => {
  _formData.value = {}
  createOrUpdateDialog.value = !createOrUpdateDialog.value
  createOrUpdateDialogTitle.value = 'create'
}

const toSave = () => {
  props.handleToSave(_formData.value).then(res => {
    createOrUpdateDialog.value = !createOrUpdateDialog.value
    getTableData()
  })
}

const toClose = () => {
  createOrUpdateDialog.value = !createOrUpdateDialog.value
}

const toUpdate = () => {
  props.handleRowUpdate(_formData.value).then(res => {
    createOrUpdateDialog.value = !createOrUpdateDialog.value
  })
}

// --------------- 分页 ----------------------
const pageEmits = defineEmits(['update:page'])

const _page = computed({
  get: () => props.page,
  set: (val) => {
    pageEmits('update:page', val)
  }
})

const autoPage = async () => {
  if (props.tableData) {
    _tableData.value = await props.getTableData({
      current: _page.value.current,
      size: _page.value.size
    }, searchForm)
  } else {
    _tableData.value = props.tableData
  }
  const tableDataLength = _tableData.value.length
  if (!isNull(_page.value) && tableDataLength > _page.value.size) {
    _tableData.value = _tableData.value.slice((_page.value.current - 1) * _page.value.size, _page.value.current * _page.value.size)
  }
}

watch(_page, () => {
  autoPage()
}, {
  immediate: true
})

watch(props.tableData, () => {
  _tableData.value = props.tableData
}, {
  immediate: true
})

const handleSizeChange = size => {
  _page.value = {
    ...props.page,
    size: size
  }
}

const handleCurrentChange = current => {
  _page.value = {
    ...props.page,
    current: current
  }
}
</script>

<style lang='scss'>
.table-body {
  .table-foot {
    position: relative;
    padding: 20px 0;
    text-align: center;

    .el-pagination {
      display: inline-flex;
      float: none;
      background: #fff;
    }
  }

  .search-container {
    display: inline-flex;
    .el-input__inner {
      height: 30px !important;
      width: 230px !important;
      margin-right: 20px;
    }
  }

  .el-button--small {
    --el-button-size: 30px !important;
  }
}
</style>

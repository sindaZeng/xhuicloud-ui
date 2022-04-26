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
    <xhui-card v-if='tableAttributes.enableSearch'>
      <div class='search-container'>
        <!--  搜索栏头部插槽    -->
        <slot name='searchTableHead' />
        <template
          v-for='(column, cIndex) in _tableAttributesColumns'
          :key='cIndex'
        >
          <el-date-picker
            v-model='searchForm[column.prop]'
            v-if='
              column.search &&
              (column.type === `datetime` || column.type === `date`)
            '
            :type='column.type'
            :value-format='column.valueFormat'
            :placeholder='
              (column.search || {}).placeholder == undefined
                ? (column.search || {}).label
                : (column.search || {}).placeholder
            '
            clearable
            :size='(column.search || {}).size || `small`'
          />
          <el-input
            v-model='searchForm[column.prop]'
            v-else-if='column.search'
            :placeholder='
              (column.search || {}).placeholder == undefined
                ? column.label
                : (column.search || {}).placeholder
            '
            clearable
            :size='(column.search || {}).size || `small`'
          />
        </template>
        <el-button
          style='margin-left: 50px'
          type='primary'
          :loading-icon='Eleme'
          :icon='Search'
          size='small'
          :loading='searchLoading'
          @click='getTableData'
        >
          {{ $t(`button.search`) }}
        </el-button>
        <!--  搜索栏尾部插槽    -->
        <slot name='searchTableTail' />
      </div>
    </xhui-card>
    <!-- 表格  -->
    <xhui-card>
      <!-- 表格操作栏     -->
      <div class='table-head' style='height: 50px; width: 100%'>
        <el-button
          type='primary'
          size='small'
          :icon='Plus'
          v-if='permission.addBtn'
          @click='handleToSave'
        >{{ $t(`button.create`) }}
        </el-button
        >
        <el-button type='primary' v-if='permission.exportBtn' size='small' :icon='Download'>{{
            $t(`button.download`)
          }}
        </el-button>
        <el-button type='primary' v-if='permission.importBtn' size='small' :icon='Upload'>{{
            $t(`button.upload`)
          }}
        </el-button>
        <slot name='tableHead' />
        <el-button
          :icon='Refresh'
          style='float: right; margin-right: 45px'
          size='default'
          @click='getTableData'
          circle
        ></el-button>
        <el-button
          :icon='View'
          style='float: right'
          size='default'
          @click='tableDrawer = !tableDrawer'
          circle
        ></el-button>
      </div>
      <!-- 表格内容     -->
      <div class='table-container'>
        <el-table ref='xhuiTableRef'
                  :border='tableAttributes.border'
                  v-loading='loading'
                  :data='_tableData'
                  row-key='id'
                  :height='tableAttributes.height'
                  :stripe='tableAttributes.stripe'
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  style='width: 100%'>
          <template
            v-for='(column, cIndex) in _tableAttributesColumns'
            :key='cIndex'
          >
            <el-table-column
              v-if='!column.hidden'
              :fixed='column.fixed'
              :sortable='column.sortable'
              :column-key='cIndex'
              align='center'
              :prop='column.prop'
              :formatter='column.formatter'
              :label='column.label'
              :show-overflow-tooltip='column.showOverflowTooltip != false'
              :width="column.width || 'auto'"
            >
              <template #default='scope' v-if='(column.type && column.type !== `datetime` && column.type !== `date` && column.type !== `password`) || $slots[column.prop]'>
                <slot :name='column.prop' :data='scope.row[column.prop]'/>
                <el-image
                  v-if='column.type === `image`'
                  style='width: 60px; height: 60px'
                  :src='scope.row[column.prop]'>
                </el-image>
                <xhui-svg v-else-if='column.type === `icon`' :icon='scope.row[column.prop]'></xhui-svg>
                <el-avatar
                  v-if='column.type === `avatar`'
                  shape='square'
                  :size='50'
                  :src='scope.row[column.prop]'
                ></el-avatar>
                <el-tag v-else-if='column.type === `tag` || column.type === `radio` || column.type === `select`'
                        :type='column.tagType ? column.tagType(scope.row) : `success`'>
                  {{ column.valueFormat ? column.valueFormat(scope.row) : scope.row[column.prop] }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              v-if='
                tableAttributes.columns.length - 1 === cIndex &&
                tableAttributes.enableOperations && (permission.editBtn || permission.delBtn || $slots.tableOperation)'
              min-width='100'
              :width='tableAttributes.operationWidth'
              :label='$t(`button.operations`)'
              align='center'>
              <template #default='scope'>
                <!-- 表格操作栏插槽 -->
                <slot name='tableOperation' :scope='scope' />
                <el-button
                  size='small'
                  v-if='permission.editBtn'
                  :icon='Edit'
                  @click='handleRowUpdate(scope.row)'>
                  {{ $t(`button.edit`) }}
                </el-button>
                <el-button
                  size='small'
                  v-if='permission.delBtn'
                  :icon='Delete'
                  type='danger'
                  @click='toDel(scope.row)'>
                  {{ $t(`button.del`) }}
                </el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <!-- 表格底部分页     -->
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
          @current-change='handleCurrentChange'
        >
        </el-pagination>
      </div>
    </xhui-card>
    <!--  右侧表格属性  -->
    <el-drawer v-model='tableDrawer' size='40%'>
      <template #title>
        <h4>{{ $t(`table.attributes`) }}</h4>
      </template>
      <template #default>
        <el-table
          ref='xhuiDrawerTableRef'
          :data='_tableAttributesColumns'
          style='width: 100%'
        >
          <el-table-column
            prop='label'
            :label='$t(`table.label`)'
            width='180' />
          <el-table-column
            prop='hidden'
            :label='$t(`table.hidden`)'
            width='180'>
            <template v-slot='scope'>
              <el-checkbox v-model='scope.row.hidden' name='type'></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop='fixed' :label='$t(`table.fixed`)' width='180'>
            <template v-slot='scope'>
              <el-checkbox v-model='scope.row.fixed' name='type'></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop='sortable'
            :label='$t(`table.sortable`)'
            width='180'
          >
            <template v-slot='scope'>
              <el-checkbox
                v-model='scope.row.sortable'
                name='type'
              ></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-drawer>
    <!--  新增/修改  -->
    <div class='createOrUpdateDialog'>
      <slot name='createOrUpdateDialog' :row='getFormData' :title='createOrUpdateDialogTitle'
            :status='getCreateOrUpdateDialog'>
        <el-dialog
          v-model='createOrUpdateDialog'
          :title='$t(`table.` + createOrUpdateDialogTitle + `Dialog`)'
          width='40%'
          :before-close='toClose'>
          <el-form
            ref='createOrUpdateFormRef'
            :model='_formData'
            label-width='120px'>
            <el-row :span='4'>
              <el-col :xl='12' :lg='12' v-for='(xColumn, xIndex) in tableColumns'
                      :key='xIndex'>
                <el-form-item
                  :label='xColumn.label'
                  :prop='xColumn.prop'
                  v-if='!xColumn.editDisplay || !xColumn.createDisplay'
                  :rules='xColumn.rules'>
                  <template #default>
                    <slot :name='xColumn.prop + `Form`' :data='_formData[xColumn.prop]'>
                      <el-date-picker
                        v-model='_formData[xColumn.prop]'
                        v-if='xColumn.type === `datetime` || xColumn.type === `date`'
                        :type='xColumn.type'
                        :value-format='xColumn.valueFormat'
                        :clearable='(xColumn.search || {}).clearable' />
                      <el-radio-group v-else-if='xColumn.type === `radio`' v-model='_formData[xColumn.prop]'>
                        <el-radio v-for='item in xColumn.baseData' :key='item.label' :label='item.label' border>
                          {{ item.value }}
                        </el-radio>
                      </el-radio-group>
                      <el-select v-model='_formData[xColumn.prop]' v-else-if='xColumn.type === `select`'
                                 :placeholder='$t(`table.pleaseSelect`) + xColumn.label'>
                        <el-option
                          v-for='item in xColumn.baseData'
                          :key='item.value'
                          :label='item.label'
                          :value='item.value'
                        />
                      </el-select>
                      <el-upload
                        v-else-if='xColumn.type === `image`'
                        class='avatar-uploader'
                        :headers='uploadData.headers'
                        :action='uploadData.action'
                        :show-file-list='false'
                        :on-success='(response, file, fileList)=>{ uploadSuccess(xColumn.prop, response, file, fileList) }'
                        :before-upload='beforeUpload'>
                        <img style='width: 50px;height: 50px' v-if='_formData[xColumn.prop]'
                             :src='_formData[xColumn.prop]'
                             class='avatar' />
                        <el-icon v-else class='avatar-uploader-icon'>
                          <Plus />
                        </el-icon>
                      </el-upload>
                      <el-input
                        v-else
                        :type='xColumn.type'
                        v-model='_formData[xColumn.prop]'
                        :disabled='xColumn.createDisabled || xColumn.editDisabled'></el-input>
                    </slot>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <span class='dialog-footer'>
              <el-button @click='toClose'>{{ $t(`button.cancel`) }}</el-button>
              <el-button
                type='primary'
                @click='createOrUpdateDialogTitle === `edit` ? toUpdate() : toSave()'>{{ $t(`button.confirm`)
                }}</el-button>
            </span>
          </template>
        </el-dialog>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, watch, defineEmits } from 'vue'
import { isNull } from '@/utils/validate'
import {
  Edit,
  Delete,
  Search,
  Plus,
  Download,
  Upload,
  Refresh,
  View
} from '@element-plus/icons' //  element-plus@1.1.0-beta.24  @See: https://github.com/element-plus/element-plus/issues/2898 貌似有BUG 后续观望
import { loading, open, close } from '@/mixins/loading'
import { ossPath } from '@/config'

const props = defineProps({
  searchLoading: {
    type: Boolean,
    default: false
  },
  tableLoading: {
    type: Boolean,
    default: false
  },
  page: {
    type: Object,
    required: false
  },
  formData: {
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
  uploadData: {
    type: Object,
    required: false,
    default: () => {
      return {
        headers: {},
        action: ''
      }
    }
  },
  tableAttributes: {
    type: Object,
    required: true
  },
  permission: {
    type: Object,
    required: false,
    default: () => {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        importBtn: false,
        exportBtn: false
      }
    }
  }
})

const _tableData = ref([])

const _formData = ref(props.formData)

const searchForm = ref({})

const tableDrawer = ref(false)

const createOrUpdateDialog = ref(false)

const createOrUpdateDialogTitle = ref('')

const createOrUpdateFormRef = ref(null)

const _tableAttributesColumns = ref(props.tableAttributes.columns)

const _page = ref(props.page)

const emits = defineEmits(['uploadSuccess', 'beforeUpload', 'getTableData', 'toDelRow', 'toSaveRow', 'toUpdateRow', 'openBefore', 'closeBefore', 'update:page', 'update:formData'])

const getCreateOrUpdateDialog = computed(() => {
  return createOrUpdateDialog
})

const getFormData = computed(() => {
  return _formData
})

const tableColumns = computed(() => {
  let tableColumns
  if (createOrUpdateDialogTitle.value === 'edit') {
    tableColumns = _tableAttributesColumns.value.filter(item => {
      if (!item.editDisplay) {
        return item
      }
    })
  } else {
    tableColumns = _tableAttributesColumns.value.filter(item => {
      if (!item.createDisplay) {
        return item
      }
    })
  }
  return tableColumns
})

// -------------- 操作 ------------------
const handleRowUpdate = (row) => {
  _formData.value = row
  emits('openBefore', _formData.value)
  createOrUpdateDialogTitle.value = 'edit'
  createOrUpdateDialog.value = true
}

const handleToSave = () => {
  _formData.value = {}
  emits('openBefore', _formData.value)
  createOrUpdateDialogTitle.value = 'create'
  createOrUpdateDialog.value = true
}

const toSave = () => {
  createOrUpdateFormRef.value.validate((valid) => {
    if (valid) {
      emits('toSaveRow', _formData.value)
      createOrUpdateDialog.value = false
    } else {
      return false
    }
  })
}

const toClose = () => {
  emits('closeBefore')
  createOrUpdateDialog.value = false
  getTableData()
}

const beforeUpload = () => {
  emits('beforeUpload')
}

const uploadSuccess = (prop, response, file, fileList) => {
  _formData.value[prop] = ossPath + response.data
  emits('uploadSuccess', response, file, fileList)
}

const toDel = row => {
  emits('toDelRow', row)
}

const toUpdate = () => {
  createOrUpdateFormRef.value.validate((valid) => {
    if (valid) {
      emits('toUpdateRow', _formData.value)
      createOrUpdateDialog.value = false
    } else {
      return false
    }
  })
}

const getTableData = () => {
  open()
  emits('getTableData', searchForm.value)
  close()
}

watch(
  _page,
  () => {
    getTableData()
  },
  {
    immediate: true
  }
)

watch(
  _formData,
  () => {
    emits('update:formData', _formData.value)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.tableData,
  () => {
    _tableData.value = props.tableData
    if (!isNull(_page.value) && _tableData.value.length > _page.value.size) {
      _tableData.value = _tableData.value.slice(
        (_page.value.current - 1) * _page.value.size,
        _page.value.current * _page.value.size
      )
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const handleSizeChange = (size) => {
  _page.value = {
    ...props.page,
    size: size
  }
  emits('update:page', _page.value)
}

const handleCurrentChange = (current) => {
  _page.value = {
    ...props.page,
    current: current
  }
  emits('update:page', _page.value)
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

  .el-button--small {
    --el-button-size: 30px !important;
  }
}

.search-container {
  display: inline-flex;

  .el-input__inner {
    height: 30px !important;
    width: 250px !important;
  }

  .el-input {
    margin-right: 20px;
  }
}
</style>

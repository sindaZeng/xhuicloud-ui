<template>
  <div class="table">
    <xh-card v-if="getProps.enableSearch.show" :card-style="cardStyle">
      <div class="table-search">
        <xh-form v-bind="getTableSearchForm" v-model:model="model" @search="onload"></xh-form>
      </div>
    </xh-card>
    <xh-card :card-style="cardStyle">
      <div class="table-head">
        <crud-head-operation>
          <template v-for="name in getHeadOperationSlotKeys" #[name]="data">
            <slot :name="name" v-bind="data || {}"></slot>
          </template>
        </crud-head-operation>
      </div>
      <div class="table-main">
        <el-table
          v-loading="loading"
          v-bind="getProps.table"
          :data="tableData"
          style="width: 100%"
          @selection-change="getProps.table.handleSelectionChange"
        >
          <el-table-column v-if="$slots['expand']" type="expand">
            <template v-if="$slots['expand']" #default="{ row }">
              <slot name="expand" :data="row" />
            </template>
          </el-table-column>
          <el-table-column v-if="getProps.table.selection" type="selection" width="55" align="center" />
          <template v-for="(item, index) in getProps.tableColumn" :key="index">
            <el-table-column
              v-if="!item.hidden && !item.isFormItem"
              v-bind="item"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template #default="scope">
                <template v-if="$slots[item.prop]">
                  <slot :name="item.prop" :data="scope.row[item.prop]" />
                </template>
                <el-image
                  v-if="item.image"
                  style="width: 60px; height: 60px"
                  :src="scope.row[item.prop]"
                  v-bind="item.image"
                >
                  <template #error>
                    <div class="image-slot">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <el-tag v-if="item.tag" v-bind="item.tag">
                  {{ typeof item.valueFormat === 'function' ? item.valueFormat(scope.row) : scope.row[item.prop] }}
                </el-tag>
                <xh-svg v-if="item.icon" :icon="scope.row[item.prop]" v-bind="item.icon" />
              </template>
            </el-table-column>
            <!-- 行操作栏 -->
            <crud-row-operation v-if="getProps.enableOperations && getProps.tableColumn.length - 1 === index">
              <template v-for="name in getRowOperationSlotKeys" #[name]="data">
                <slot :name="name" v-bind="data || {}"></slot>
              </template>
            </crud-row-operation>
          </template>
        </el-table>
      </div>
      <!-- 表格底部分页     -->
      <div class="table-foot">
        <el-pagination
          v-if="enablePagination"
          class="table-foot-pagination"
          v-bind="paginationRef"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <crud-form>
        <template v-for="item in getFormItemSlotKeys" #[item]="data">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
        <template v-for="item in getFormSlotKeys" #[item]="data">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </crud-form>
    </xh-card>
  </div>
</template>

<script lang="ts" setup>
  import { Picture as IconPicture } from '@element-plus/icons-vue'
  import crudHeadOperation from './crud-head-operation.vue'
  import crudRowOperation from './crud-row-operation.vue'
  import CrudForm from './crud-form.vue'
  import { useSlots } from 'vue'
  import tableProps, { tableEmits } from './crud'
  import { useTableForm, useTableMethods, createTableContext, useTableState } from './hooks'

  const slots = useSlots()

  const props = defineProps(tableProps)

  const emit = defineEmits(tableEmits)

  const state = useTableState(props)

  const tableForm = useTableForm(state, slots)

  const {
    getTableSearchForm,
    model,
    getFormSlotKeys,
    getFormItemSlotKeys,
    getRowOperationSlotKeys,
    getHeadOperationSlotKeys
  } = tableForm

  const { tableData, paginationRef, getProps, enablePagination } = state

  const methods = useTableMethods({ state, props, emit, tableForm })

  const { onload, handleSizeChange, handleCurrentChange } = methods

  const instance = {
    ...props,
    ...state,
    ...methods,
    ...tableForm
  }

  createTableContext(instance)

  onload()
</script>
<style lang="scss" scoped>
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
  .image-slot .el-icon {
    font-size: 30px;
  }

  .table {
    .table-search {
      .el-input__inner {
        height: 30px !important;
        width: 250px !important;
      }
      .el-input {
        margin-right: 20px;
      }
    }
    .table-head {
      height: 50px;
      width: 100%;
    }
    .table-foot {
      position: relative;
      padding: 20px 0;
      text-align: center;

      .table-foot-pagination {
        display: inline-flex;
        float: none;
        background: #fff;
      }
    }

    .el-button--small {
      --el-button-size: 30px !important;
    }
  }
</style>

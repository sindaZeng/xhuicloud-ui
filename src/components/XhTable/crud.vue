<template>
  <div class="table">
    <xh-card>
      <div class="table-head">
        <crud-operation />
      </div>
      <div class="table-main">
        <el-table v-loading="loading" v-bind="table" :data="tableData" style="width: 100%">
          <el-table-column v-for="(item, index) in tableColumn" :key="index" v-bind="item" align="center">
            <template #default="scope">
              <template v-if="$slots[item.prop]">
                <slot :name="item.prop" :data="scope.row[item.prop]" />
              </template>
              <el-image
                v-if="item.image"
                style="width: 100px; height: 100px"
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
        </el-table>
      </div>
      <!-- 表格底部分页     -->
      <div class="table-foot">
        <el-pagination
          v-if="paginationRef"
          class="table-foot-pagination"
          v-bind="paginationRef"
          background
          layout="total, sizes,  prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </xh-card>
  </div>
</template>

<script lang="ts" setup>
  import { Picture as IconPicture } from '@element-plus/icons-vue'
  import tableProps, { tableEmits } from './crud'
  import crudOperation from './crud-operation.vue'
  import { useTableMethods, useTableState, createTableContext } from './hooks'
  import XhCard from '../XhCard/index.vue'

  const props = defineProps(tableProps)

  const emit = defineEmits(tableEmits)

  const state = useTableState(props)

  const { table, tableData, tableColumn, paginationRef } = state

  const methods = useTableMethods({ state, props, emit })

  const { onload, handleSizeChange, handleCurrentChange } = methods

  const instance = {
    ...props,
    ...state,
    ...methods
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

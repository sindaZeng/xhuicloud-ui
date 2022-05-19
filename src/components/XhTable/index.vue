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
    <!-- 表格  -->
    <xh-card>
      <!-- 表格内容     -->
      <div class='table-container'>
        <el-table ref='xhTableRef'
                  :border='tableAttributes.enableBorder'
                  :data='tableData'
                  row-key='id'
                  :stripe='tableAttributes.enableStripe'
                  :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                  style='width: 100%'>
          <template
            v-for='(column, cIndex) in tableAttributes.columns'
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
                <xh-svg v-else-if='column.type === `icon`' :icon='scope.row[column.prop]'></xh-svg>
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
          </template>
        </el-table>
      </div>
    </xh-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, watch, defineEmits } from 'vue'
import { tableProps, emitOptions } from '@/components/XhTable/default'
import { useTableState } from '@/components/XhTable/hooks/useTable'

const props = defineProps(tableProps)

const emits = defineEmits(emitOptions)

const { tableAttributes, tableData } = useTableState(props)

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

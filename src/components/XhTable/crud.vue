<template>
  <el-table style="width: 100%" v-bind="table" :data="tableData">
    <el-table-column v-for="(item, index) in tableColumn" :key="index" v-bind="item" align="center">
      <template v-if="item.image" #default="scope">
        <el-image style="width: 100px; height: 100px" :src="scope.row[item.prop]" v-bind="item.image">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  import { Picture as IconPicture } from '@element-plus/icons-vue'
  import { defineProps } from 'vue'
  import tableProps from './default'
  import { useTableState } from './hooks/useTable'
  import { useTableMethods } from './hooks/useTableMethods'

  const props = defineProps(tableProps)

  const state = useTableState(props)

  const { table, tableData, tableColumn } = state

  const methods = useTableMethods({ state, props })

  const { onload } = methods

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
</style>
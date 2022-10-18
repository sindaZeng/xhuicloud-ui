<template>
  <el-table-column
    v-if="permission.editBtn || permission.delBtn || $slots"
    min-width="100"
    :width="getProps.operationWidth"
    :label="$t(`button.operations`)"
    align="center"
  >
    <template #default="scope">
      <template v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" :data="scope.row"></slot>
      </template>
      <el-button v-if="permission.editBtn" size="small" :icon="Edit" @click="handleRowUpdate(scope.row)">
        {{ $t(`button.edit`) }}
      </el-button>
      <el-button v-if="permission.delBtn" size="small" :icon="Delete" type="danger" @click="toDel(scope.row)">
        {{ $t(`button.del`) }}
      </el-button>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
  import { useTableContext } from './hooks'
  import { Edit, Delete } from '@element-plus/icons-vue'

  const tableContext = useTableContext()
  const { getProps, permission, setModel, emit } = tableContext

  const handleRowUpdate = (row: any) => {
    tableContext.openDialog('edit', row)
    setModel(row)
  }

  const toDel = (row: any) => {
    emit('toDelRow', row)
  }
</script>
<style lang="scss" scoped></style>

<template>
  <Crud
    :table="{ rowKey: 'id', defaultExpandAll: true, border: true }"
    :enable-operations="true"
    :permission="{ addBtn: true, editBtn: true, delBtn: true }"
    :table-column="tableColumn"
    :onload="onload"
    :data="deptData"
    @toUpdateRow="toUpdateRow"
    @toSaveRow="toSaveRow"
    @toDelRow="toDelRow"
  >
    <!-- 表单插槽 -->
    <template #parentIdFormItem="{ formModel, field }">
      <el-cascader
        v-model="formModel[field]"
        :options="deptTreeData"
        :show-all-levels="false"
        :props="{ checkStrictly: true, emitPath: false }"
        clearable
      ></el-cascader>
    </template>
  </Crud>
</template>
<script lang="ts" setup>
  import { createDept, deleteDept, deptTree, updateDept } from '@/api/upms/dept'
  import { ElMessageBox } from 'element-plus'
  import { ref } from 'vue'
  import { tableColumn } from '.'
  const deptData = ref<Dept[]>()
  const deptTreeData = ref<Dept[]>([])
  /**
   * 获取租户列表
   */
  const onload = async (searchForm?: any) => {
    const response = await deptTree(searchForm)
    deptData.value = response
    deptTreeData.value.push({ value: 0, label: '无' } as Dept)
    deptTreeData.value = deptTreeData.value.concat(response)
    return response
  }

  const toUpdateRow = (formModel: SysDept) => {
    updateDept(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysDept) => {
    createDept(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysDept) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.name} ?`).then(() => {
      return deleteDept(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

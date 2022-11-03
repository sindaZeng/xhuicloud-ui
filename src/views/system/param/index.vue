<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :enable-operations="true"
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="paramData"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  ></Crud>
</template>
<script lang="ts" setup>
  import { createParam, deleteParam, paramPage, updateParam } from '@/api/upms/param'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { tableColumn } from '.'
  import { checkPermission } from '@/utils'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_param', false),
      editBtn: checkPermission('sys_editor_param', false),
      delBtn: checkPermission('sys_delete_param', false)
    }
  })

  const paramData = ref<SysParam[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await paramPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    paramData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysParam) => {
    updateParam(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysParam) => {
    createParam(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysParam) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.paramName} ?`).then(() => {
      return deleteParam(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

<template>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :permission="{ delBtn: checkPermission('sys_delete_file', false) }"
    :enable-search="search"
    :table-column="fileTableColumn"
    :onload="onload"
    :data="fileData"
    @toDelRow="toDelRow"
  ></Crud>
</template>
<script lang="ts" setup>
  import { deleteFile, filePage } from '@/api/upms/file'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref } from 'vue'
  import { fileTableColumn } from '.'
  import { checkPermission } from '@/utils'

  const fileData = ref<SysFile[]>()
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
    const response = await filePage({ ...page.value, ...searchForm })
    page.value.total = response.total
    fileData.value = response.records
    return response.records
  }

  const toDelRow = (formModel: SysFile) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.id} ?`).then(() => {
      return deleteFile(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

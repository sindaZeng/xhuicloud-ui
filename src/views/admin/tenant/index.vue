<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :enable-operations="true"
    :permission="{ addBtn: true, editBtn: true, delBtn: true }"
    :table-column="tableColumn"
    :onload="onload"
    :data="tenantData"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  ></Crud>
</template>
<script lang="ts" setup>
  import { SysTenant } from '@/api/upms/entity/tenant'
  import { createTenant, deleteTenant, tenantPage, updateTenant } from '@/api/upms/tenant'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref } from 'vue'
  import { tableColumn } from '.'

  const tenantData = ref<SysTenant[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  /**
   * 获取租户列表
   */
  const onload = async (searchForm?: any) => {
    const response = await tenantPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    tenantData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysTenant) => {
    updateTenant(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysTenant) => {
    createTenant(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysTenant) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.name} ?`).then(() => {
      return deleteTenant(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

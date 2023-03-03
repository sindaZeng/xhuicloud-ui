<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :table-column="logLoginTableColumn"
    :onload="onload"
    :data="logLoginData"
  ></Crud>
</template>
<script lang="ts" setup>
  import { logLoginPage } from '@/api/logs/log-login'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ref } from 'vue'
  import { logLoginTableColumn } from '.'

  const logLoginData = ref<AuditLogin[]>()
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
    const response = await logLoginPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    logLoginData.value = response.records
    return response.records
  }
</script>
<style lang="scss" scoped></style>

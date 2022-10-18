<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :table-column="logTableColumn"
    :onload="onload"
    :data="logData"
  ></Crud>
</template>
<script lang="ts" setup>
  import { logPage } from '@/api/logs/log'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ref } from 'vue'
  import { logTableColumn } from '.'

  const logData = ref<SysLog[]>()
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
    const response = await logPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    logData.value = response.records
    return response.records
  }
</script>
<style lang="scss" scoped></style>

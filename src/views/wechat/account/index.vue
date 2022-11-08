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
  <Crud
    v-model:page="page"
    :enable-search="search"
    :enable-operations="true"
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="data"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  ></Crud>
</template>
<script lang="ts" setup>
  import { accountPage, createAccount, deleteAccount, updateAccount } from '@/api/wechat/account'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { checkPermission } from '@/utils'
  import { tableColumn } from '.'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_account', false),
      editBtn: checkPermission('sys_editor_account', false),
      delBtn: checkPermission('sys_delete_account', false)
    }
  })

  const data = ref<Account[]>()
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
    const response = await accountPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    data.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: Account) => {
    updateAccount(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: Account) => {
    createAccount(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: Account) => {
    ElMessageBox.confirm('Are you confirm to delete ' + formModel.id + ' ?').then(() => {
      return deleteAccount(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

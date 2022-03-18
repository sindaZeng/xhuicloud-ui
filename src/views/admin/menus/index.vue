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
  <xhui-table
    :tableAttributes='tableAttributes'
    :permission='permission'
    :tableData='tableData'
    @toDelRow='toDelRow'
    @getTableData='getTableData'>
    <template #createOrUpdateDialog='{ status, title, row }'>
      <tableForm :status='status' :row='row' :title='title' @refreshTableData='getTableData'></tableForm>
    </template>
  </xhui-table>
</template>

<script setup>
import { menuTree, deleteMenu } from '@/api/menu'
import { computed, ref } from 'vue'
import { tableAttributes } from '@/api/menu/dto'
import { checkData } from '@/utils'
import { useStore } from 'vuex'
import TableForm from './form'
import { ElMessageBox, ElNotification } from 'element-plus'

const store = useStore()

const tableData = ref([])

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_role, false),
    editBtn: checkData(store.getters.permissions.sys_editor_role, false),
    delBtn: checkData(store.getters.permissions.sys_delete_role, false)
  }
})

const getTableData = async () => {
  const records = await menuTree({ disabled: false })
  tableData.value = records
  return records
}

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.name} ?`)
    .then(() => {
      return deleteMenu(row.id)
    }).catch(() => {
    }).then(() => {
      ElNotification({
        title: 'Success',
        message: 'Delete success',
        type: 'success'
      })
      getTableData()
    })
}
</script>

<style lang='scss' scoped>
::v-deep(.el-table) {
  tr{
    height: 50px;
  }
  .svg-icon {
    width: 30px;
    height: 30px;
  }
}
</style>

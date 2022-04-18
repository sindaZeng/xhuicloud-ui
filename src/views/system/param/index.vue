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
    ref='userTableRef'
    :permission='permission'
    :tableAttributes='tableAttributes'
    v-model:page='page'
    :tableData='tableData'
    @getTableData='getTableData'
    @toDelRow='toDelRow'
    @toSaveRow='toSaveRow'
    @toUpdateRow='toUpdateRow'>
  </xhui-table>
</template>

<script setup>
import { tableAttributes } from '@/api/param/dto'
import { paramPage, createParam, delParam, updateParam } from '@/api/param'
import usePage from '@/mixins/page'
import { computed, ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { checkData } from '@/utils'
import { useStore } from 'vuex'

const store = useStore()

const { page } = usePage()

const tableData = ref([])

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_param, false),
    editBtn: checkData(store.getters.permissions.sys_editor_param, false),
    delBtn: checkData(store.getters.permissions.sys_delete_param, false)
  }
})

const getTableData = (searchForm) => {
  paramPage({ ...page.value, ...searchForm }).then(response => {
    page.value.total = response.total
    tableData.value = response.records
  }).catch(() => {
  })
}

const toUpdateRow = row => {
  updateParam(row).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Update success',
      type: 'success'
    })
  })
}

const toSaveRow = data => {
  createParam(data).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    getTableData()
  })
}

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.name} ?`)
    .then(() => {
      return delParam(row.id).then(res => {
        ElNotification({
          title: 'Success',
          message: 'Delete success',
          type: 'success'
        })
      })
    }).catch(() => {
    }).then(() => {
      getTableData()
    })
}
</script>

<style lang='scss' scoped>

</style>

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
   @open-before='openBefore'
   @close-before='closeBefore'
   @getTableData='getTableData'
   @toDelRow='toDelRow'
   @toSaveRow='toSaveRow'
   @toUpdateRow='toUpdateRow'>
   <template #parentIdForm>
     <el-cascader
       v-model="form.parentId"
       :options="deptTreeData"
       :show-all-levels='false'
       :props="{ checkStrictly: true }"
       clearable
     ></el-cascader>
   </template>
 </xhui-table>
</template>

<script setup>
import { tableAttributes } from '@/api/dept/dto'
import { deptTree, createDept, delDept, updateDept } from '@/api/dept'
import usePage from '@/mixins/page'
import { computed, ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { checkData } from '@/utils'
import { useStore } from 'vuex'

const store = useStore()

const form = ref({})

const { page } = usePage()

const tableData = ref([])

const deptTreeData = ref([])

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_dept, false),
    editBtn: checkData(store.getters.permissions.sys_editor_dept, false),
    delBtn: checkData(store.getters.permissions.sys_delete_dept, false)
  }
})

const getTableData = async (searchForm) => {
  deptTreeData.value = []
  const records = await deptTree(searchForm)
  tableData.value = records
  deptTreeData.value.push({ value: 0, label: '无' })
  deptTreeData.value = deptTreeData.value.concat(records)
  return records
}

const toUpdateRow = row => {
  updateDept(row).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Update success',
      type: 'success'
    })
  })
}

const toSaveRow = data => {
  createDept(data).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    getTableData()
  })
}

const toDelRow = row => {
  ElMessageBox.confirm('Are you confirm to delete?')
    .then(() => {
      return delDept(row.id).then(res => {
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

const openBefore = (formData) => {
  form.value = formData
}
const closeBefore = () => {
  form.value = []
}

</script>

<style lang='scss' scoped>

</style>

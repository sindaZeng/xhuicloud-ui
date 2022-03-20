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
    :tableData='tableData'
    :permission='permission'
    @toDelRow='toDelRow'
    @getTableData='getTableData'>
  </xhui-table>
</template>

<script setup>
import usePage from '@/mixins/page'
import { computed, ref } from 'vue'
import { filePage, delFile } from '@/api/file'
import { tableAttributes } from '@/api/file/dto'
import { ElMessageBox, ElNotification } from 'element-plus'
import { checkData } from '@/utils'
import { useStore } from 'vuex'

const store = useStore()

const { page } = usePage()

const tableData = ref([])

const permission = computed(() => {
  return {
    delBtn: checkData(store.getters.permissions.sys_delete_file, false)
  }
})

const getTableData = async (searchForm) => {
  const {
    records,
    total
  } = await filePage({ ...page.value, ...searchForm })
  page.value.total = total
  tableData.value = records
  return records
}

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.name} ?`)
    .then(() => {
      delFile(row.id)
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

</style>

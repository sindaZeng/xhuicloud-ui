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
  <xhuiTable
    :tableAttributes='tableAttributes'
    v-model:page='page'
    :getTableData='getTableData'
    :handleRowDel='handleRowDel'
    :handleToSave='handleToSave'
    :handleRowUpdate='handleRowUpdate'>
  </xhuiTable>
</template>

<script setup>
import { tableAttributes } from '@/api/roles/dto'
import { page } from '@/mixins/page'
import { rolesPage, delRole, updateRole, createRole } from '@/api/roles'
import { ElMessageBox } from 'element-plus'

const getTableData = async (page, searchForm) => {
  const {
    records,
    total
  } = await rolesPage({ ...page, ...searchForm })
  page.total = total
  return records
}

const handleRowUpdate = row => {
  return updateRole(row)
}

const handleToSave = data => {
  return createRole(data)
}

const handleRowDel = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.name} ?`)
    .then(() => {
      delRole(row.id)
    }).catch(() => {
    })
}
</script>

<style lang='scss' scoped>

</style>

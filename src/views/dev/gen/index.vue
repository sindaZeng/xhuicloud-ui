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
    v-model:page='page'
    :permission='permission'
    :tableAttributes='tableAttributes'
    :tableData='tableData'
    @toSaveRow='toSaveRow'
    @getTableData='getTableData'>
    <template #tableOperation='{ scope }'>
      <el-button
        size="small"
        @click='test(scope.row)'>
        <el-icon class="el-icon--left"><xhui-svg icon='connect'></xhui-svg></el-icon>测试
      </el-button>
      <el-button
        size="small"
        @click='handleDbInfo(scope.row, ``)'
        type="success">
        <el-icon class="el-icon--left"><xhui-svg icon='db'></xhui-svg></el-icon>库信息
      </el-button>
      <el-button
        size="small"
        @click='handleDbInfo(scope.row, `success`)'
        type="primary">
        <el-icon class="el-icon--left"><xhui-svg icon='db'></xhui-svg></el-icon>一键生成
      </el-button>
    </template>
  </xhui-table>
  <dbInfo ref='dbInfoRef'></dbInfo>
</template>

<script setup>
import { tableAttributes } from '@/api/db/dto'
import { dbPage, dbTest, createDb } from '@/api/db'
import usePage from '@/mixins/page'
import { computed, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { checkData } from '@/utils'
import { useStore } from 'vuex'
import { encryption } from '@/utils/encrypt'
import { aesIv } from '@/config'
import dbInfo from './db-info'

const store = useStore()

const { page } = usePage()

const tableData = ref([])

const dbInfoRef = ref()

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_db, false)
  }
})

const getTableData = (searchForm) => {
  dbPage({ ...page.value, ...searchForm }).then(response => {
    page.value.total = response.total
    tableData.value = response.records
  }).catch(() => {
  })
}

const test = row => {
  dbTest(row.id).then(response => {
    ElNotification({
      title: 'Success',
      message: '数据库连接可用!',
      type: 'success'
    })
  }).catch(() => {
    ElNotification({
      title: 'error',
      message: '数据库连接不可用!',
      type: 'error'
    })
  })
}

const toSaveRow = data => {
  createDb(encryption(data, aesIv, ['username', 'password'])).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    getTableData()
  })
}

const handleDbInfo = (row, type) => {
  dbInfoRef.value.init(row.id, type)
}
</script>

<style lang='scss' scoped>

</style>

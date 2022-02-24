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
  <div class='table-container'>
    <el-table
      ref="xhuiTable"
      :data="_tableData" style="width: 100%">
      <template v-for="(column, cIndex) in tableAttributes.columns" :key='cIndex'>
        <el-table-column
          :column-key="cIndex"
          :prop='column.prop'
          :label="column.label"
          :width="column.width || 'auto'"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if='_page'
      v-bind="$attrs"
      :layout="pageLayout"
      :page-sizes="pageSizes"
      :total="_page.total"
      v-model:currentPage="_page.currentPage"
      v-model:page-size="_page.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
const _tableData = ref([])
const props = defineProps({
  page: {
    type: Object,
    required: false
  },
  pageLayout: {
    type: String,
    default: 'total, prev, pager, next'
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 30, 50]
    }
  },
  tableData: {
    type: Array,
    default: () => {
      return []
    }
  },
  tableAttributes: {
    type: Object,
    required: true
  },
  getTableData: {
    type: Function,
    required: false
  }
})

const pageEmits = defineEmits(['update:page'])

const _page = computed({
  get: () => props.page,
  set: (val) => {
    pageEmits('update:page', val)
  }
})

const autoPage = async () => {
  if (props.tableData) {
    _tableData.value = await props.getTableData(_page.value)
  } else {
    _tableData.value = props.tableData
  }
  const tableDataLength = _tableData.value.length
  console.log(_page)
  if (_page.value !== 'undefined' || tableDataLength > _page.value.pageSize) {
    _tableData.value = _tableData.value.slice((_page.value.currentPage - 1) * _page.value.pageSize, _page.value.currentPage * _page.value.pageSize)
  }
}

watch(_page, () => {
  autoPage()
}, {
  immediate: true
})

watch(props.tableData, () => {
  _tableData.value = props.tableData
}, {
  immediate: true,
  deep: true
})

// autoPage()

const handleSizeChange = pageSize => {
  _page.value = { ...props.page, pageSize: pageSize }
  props.getTableData()
}

const handleCurrentChange = currentPage => {
  _page.value = { ...props.page, currentPage: currentPage }
  props.getTableData(_page.value)
}
</script>

<style lang='scss' scoped>
.el-pagination {
  text-align: center;
  background: #fff;
  padding: 32px 16px;
}
.el-pagination.hidden {
  display: none;
}
</style>

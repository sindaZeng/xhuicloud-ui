<template>
  <el-dialog v-model="dictDataDialogVisible" title="数据项信息">
    <Crud
      v-model:page="page"
      :enable-operations="true"
      :permission="{ addBtn: true, editBtn: true, delBtn: true }"
      :table-column="dictDataTableColumn"
      :operation-width="260"
      :onload="onload"
      :data="dictDataData"
      @toDelRow="toDelRow"
      @toSaveRow="toSaveRow"
      @toUpdateRow="toUpdateRow"
    ></Crud>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { createDictData, deleteDictData, dictDataPage, updateDictData } from '@/api/upms/dictData'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref } from 'vue'
  import { dictDataTableColumn } from '.'

  const dictDataDialogVisible = ref<boolean>(false)
  const dictDataData = ref<SysDictData[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const dictId = ref<number>()

  const init = (id: number) => {
    dictDataDialogVisible.value = true
    dictId.value = id
  }
  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await dictDataPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    dictDataData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysDictData) => {
    updateDictData(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysDictData) => {
    createDictData(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysDictData) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.id} ?`).then(() => {
      return deleteDictData(formModel.id).then(() => {
        onload()
      })
    })
  }

  defineExpose({ init })
</script>
<style lang="scss" scoped></style>

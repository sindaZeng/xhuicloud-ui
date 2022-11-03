<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :enable-operations="true"
    :permission="permission"
    :table-column="dictTableColumn"
    :operation-width="260"
    :onload="onload"
    :data="dictData"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  >
    <template #tableOperation="{ data }">
      <el-button size="small" @click="onloadDictData(data)">
        <el-icon class="el-icon--left">
          <xh-svg icon="dictData"></xh-svg>
        </el-icon>
        字典
      </el-button>
    </template>
  </Crud>
  <xh-dict-data ref="dictDataRef"></xh-dict-data>
</template>
<script lang="ts" setup>
  import xhDictData from './data.vue'
  import { createDict, deleteDict, dictPage, updateDict } from '@/api/upms/dict'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { dictTableColumn } from '.'
  import { checkPermission } from '@/utils'
  export type DictDataInstance = InstanceType<typeof xhDictData>

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_dict', false),
      editBtn: checkPermission('sys_editor_dict', false),
      delBtn: checkPermission('sys_delete_dict', false)
    }
  })

  const dictDataRef = ref<DictDataInstance>()
  const dictData = ref<SysDict[]>()
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
    const response = await dictPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    dictData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysDict) => {
    updateDict(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysDict) => {
    createDict(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysDict) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.id} ?`).then(() => {
      return deleteDict(formModel.id).then(() => {
        onload()
      })
    })
  }

  const onloadDictData = (formModel: SysDict) => {
    dictDataRef.value?.init(formModel.id)
  }
</script>
<style lang="scss" scoped></style>

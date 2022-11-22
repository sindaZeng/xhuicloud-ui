<template>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :operation-width="350"
    :permission="permission"
    :enable-search="search"
    :table-column="dsTableColumn"
    :onload="onload"
    :data="genDsInfosData"
    @toSaveRow="toSaveRow"
    @openBefore="openBefore"
  >
    <!-- 行操作插槽 注:必须tableOperation -->
    <template #tableOperation="{ data }">
      <el-button size="small" @click="toDsTest(data)">
        <el-icon class="el-icon--left"><xh-svg icon="connect" /></el-icon>
        {{ $t('gen.TestConnect') }}
      </el-button>
      <el-button size="small" type="success" @click="handleDbInfo(data, ``)">
        <el-icon class="el-icon--left"><xh-svg icon="db" /></el-icon>
        {{ $t('gen.DbInfo') }}
      </el-button>
      <el-button
        v-if="checkPermission('sys_download_code', false)"
        size="small"
        type="primary"
        @click="handleDbInfo(data, `success`)"
      >
        <el-icon class="el-icon--left"><xh-svg icon="genCode" /></el-icon>
        {{ $t('gen.GenAll') }}
      </el-button>
    </template>
  </Crud>
  <dbInfo ref="dbInfoRef"></dbInfo>
</template>
<script lang="ts" setup>
  import { createDs, dsPage, dsTest } from '@/api/generator/db'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ref, computed } from 'vue'
  import { dsTableColumn } from '.'
  import { encryption } from '@/utils/encrypt'
  import setting from '@/config/setting.config'
  import dbInfo from './db-info.vue'
  import { checkPermission } from '@/utils'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_db', false),
      editBtn: checkPermission('sys_editor_db', false),
      delBtn: checkPermission('sys_delete_db', false)
    }
  })

  type DbInfoInstance = InstanceType<typeof dbInfo>

  const genDsInfosData = ref<GenDsInfo[]>()

  const dbInfoRef = ref<DbInfoInstance>()

  const page = ref<Pagination>({ current: 1, size: 10 })

  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  /**
   * 表单打开前回调
   * 被打码的数据填充空字符串
   */
  const openBefore = (formModel: GenDsInfo) => {
    if (formModel) {
      formModel.password = ''
      formModel.host = ''
      formModel.port = undefined
    }
  }

  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await dsPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    genDsInfosData.value = response.records
    return response.records
  }

  const toSaveRow = (formModel: GenDsInfo) => {
    createDs(encryption(formModel, setting.aesIv, ['password'])).then(() => {
      onload()
    })
  }

  const toDsTest = (formModel: GenDsInfo) => {
    dsTest(formModel.id)
  }

  const handleDbInfo = (formModel: GenDsInfo, type: string) => {
    dbInfoRef.value?.init(formModel.id, type)
  }
</script>
<style lang="scss" scoped></style>

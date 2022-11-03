<template>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :permission="permission"
    :enable-search="search"
    :table-column="clientTableColumn"
    :onload="onload"
    :data="clientData"
    @open-before="openBefore"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  >
    <template #clientSecretFormItem>
      <el-input v-model="clientSecret" disabled />
    </template>

    <template #captchaEnableFormItem="{ formModel, field }">
      <el-radio-group v-model="formModel[field]">
        <el-radio v-for="(item, index) in baseBoolean" :key="index" :label="item.label" border>
          {{ item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template #multiLoginFormItem="{ formModel, field }">
      <el-radio-group v-model="formModel[field]">
        <el-radio v-for="(item, index) in baseBoolean" :key="index" :label="item.label" border>
          {{ item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template #tokenFormatFormItem="{ formModel, field }">
      <el-radio-group v-model="formModel[field]">
        <el-radio label="reference" border>匿名令牌</el-radio>
        <el-radio label="self-contained" border>JWT</el-radio>
      </el-radio-group>
    </template>
  </Crud>
</template>
<script lang="ts" setup>
  import { clientPage, createClient, deleteClient, getClientSecretById, updateClient } from '@/api/upms/client'
  import { baseBoolean } from '@/api/base/baseEntity'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ref, computed } from 'vue'
  import { clientTableColumn } from '.'
  import { isNullOrUnDef } from '@/utils/is'
  import { ElMessageBox } from 'element-plus'
  import { checkPermission } from '@/utils'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_client', false),
      editBtn: checkPermission('sys_editor_client', false),
      delBtn: checkPermission('sys_delete_client', false)
    }
  })

  const clientData = ref<SysClient[]>()
  const clientSecret = ref<string>('')
  const page = ref<Pagination>({ current: 1, size: 10 })
  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  const openBefore = (formModel: SysClient) => {
    if (isNullOrUnDef(formModel)) {
      return
    }
    getClientSecretById(formModel.id).then((res) => {
      clientSecret.value = res
    })
  }

  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await clientPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    clientData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysClient) => {
    updateClient(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysClient) => {
    createClient(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysClient) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.name} ?`).then(() => {
      return deleteClient(formModel.id).then(() => {
        onload()
      })
    })
  }
</script>
<style lang="scss" scoped></style>

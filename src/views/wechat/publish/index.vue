<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <select-wechat-vue @after-select="onload"></select-wechat-vue>
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card> </xh-card>
    </el-col>
  </el-row>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="publishData"
  ></Crud>
</template>
<script lang="ts" setup>
  import { publishPage } from '@/api/wechat/publish'
  import { Pagination } from '@/components/XhTable/pagination'
  import { checkPermission } from '@/utils'
  import { ref, computed } from 'vue'
  import { tableColumn } from '.'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_tenant', false),
      editBtn: checkPermission('sys_editor_tenant', false),
      delBtn: checkPermission('sys_delete_tenant', false)
    }
  })

  const publishData = ref<Publish[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const wechatMpAppId = ref<string>('')

  const onload = async (wechatSummary: WeChatSummary) => {
    wechatMpAppId.value = wechatSummary.appId

    const response = await publishPage(wechatMpAppId.value, { ...page.value })
    page.value.total = response.total
    publishData.value = response.records
    return response.records
  }
</script>
<style lang="scss" scoped></style>

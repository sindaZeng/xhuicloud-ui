<template>
  <xh-card :body-style="bodyStyle">
    <el-select
      v-model="wechatMpAppId"
      filterable
      remote
      reserve-keyword
      :placeholder="$t('placeholder.wechatMpName')"
      :remote-method="onload"
      :loading="loading"
    >
      <el-option v-for="item in accountDatas" :key="item.appId" :label="item.name" :value="item.appId" />
    </el-select>
    <el-descriptions :title="$t('WeChatMenu.detail')" :column="1" style="margin-top: 30px">
      <el-descriptions-item :label="$t('WeChatMenu.name') + ':'">{{ wechatSummary.name }}</el-descriptions-item>
      <el-descriptions-item :label="$t('WeChatMenu.appid') + ':'">{{ wechatSummary.appId }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions :title="$t('WeChatMenu.dataOf7day')" :column="1" style="margin-top: 30px">
      <el-descriptions-item :label="$t('WeChatMenu.newUser') + ':'">
        {{ wechatSummary.newUser }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('WeChatMenu.cancelUser') + ':'">
        {{ wechatSummary.cancelUser }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('WeChatMenu.AddUser') + ':'">
        {{ wechatSummary.newUser - wechatSummary.cancelUser }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('WeChatMenu.totalUser') + ':'">
        {{ wechatSummary.totalUser }}
      </el-descriptions-item>
    </el-descriptions>
  </xh-card>
</template>
<script lang="ts" setup>
  import { accountList } from '@/api/wechat/account'
  import { getUserSummary } from '@/api/wechat/user'
  import { ref, watch, unref } from 'vue'
  import { global } from '@/i18n'
  import { isEmpty } from '@/utils/is'

  const bodyStyle = { height: '85vh' }

  /** 公众号下拉选择框加载 **/
  const loading = ref(false)
  /** 可选择的公众号列表 **/
  const accountDatas = ref<Account[]>()
  /** 当前选择的公众号appid **/
  const wechatMpAppId = ref<string>('')
  /** 被选中的公众号7天用户数据 **/
  const wechatSummary = ref<WeChatSummary>({
    name: global.t('WeChatMenu.selectEmpty'),
    appId: '',
    newUser: 0,
    cancelUser: 0,
    totalUser: 0
  })
  const emit = defineEmits(['afterSelect'])
  /**
   * 展示当前选中后回调
   */
  watch(
    () => unref(wechatMpAppId),
    async () => {
      if (unref(wechatMpAppId) !== '') {
        wechatSummary.value = await getUserSummary(unref(wechatMpAppId))
        emit('afterSelect', wechatSummary.value)
      }
    },
    {
      deep: true,
      immediate: true
    }
  )
  /**
   * 加载下拉选择框
   * @param name
   */
  const onload = async (name?: string) => {
    loading.value = true
    accountDatas.value = await accountList(name)
    if (unref(accountDatas) != undefined && accountDatas.value.length > 0 && isEmpty(unref(wechatMpAppId))) {
      wechatMpAppId.value = accountDatas.value[0].appId
    }
    loading.value = false
  }

  onload()
</script>
<style lang="scss" scoped></style>

<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <select-wechat-vue @after-select="onload" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card>
        <template v-if="permission.addBtn" #header>
          <el-button type="success" @click="toCreateDraft(eidtorRef)">新的创作</el-button>
        </template>
        <el-empty v-if="data.length === 0" :image-size="200" />
        <el-row v-else :gutter="10">
          <el-col v-for="draft in data" :key="draft.mediaId" :xs="8" :sm="6" :md="6" :lg="8" :xl="6">
            <el-card :body-style="{ padding: 0 }" shadow="hover">
              <!-- 单个图文消息 -->
              <Single
                v-if="draft.content.newsItem.length === 1"
                :draft="draft"
                @to-delete-draft="toDeleteDraft"
                @to-publish-draft="toPublishDraft"
                @to-edit-draft="toEditDraft"
              ></Single>
              <Multiple v-else :draft="draft"></Multiple>
              <!-- 多个图文消息 -->
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :total="page.total"
          @size-change="onload"
          @current-change="onload"
        />
        <!-- 编辑 -->
        <Eidtor ref="eidtorRef"></Eidtor>
      </xh-card>
    </el-col>
  </el-row>
</template>
<script lang="tsx" setup>
  import { deleteDraft, draftPage } from '@/api/wechat/draft'
  import { Pagination } from '@/components/XhTable/pagination'
  import { isEmpty, isNullOrUnDef } from '@/utils/is'
  import { computed, provide, reactive, ref, unref } from 'vue'
  import selectWechatVue from '../components/selectWechat.vue'
  import { ElMessageBox } from 'element-plus'
  import { checkPermission } from '@/utils'
  import { publish } from '@/api/wechat/publish'
  import Eidtor from './editor.vue'
  import Single from './single.vue'
  import Multiple from './multiple.vue'

  type EidtorInstance = InstanceType<typeof Eidtor>
  const eidtorRef = ref<EidtorInstance>()

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_drafts', false),
      editBtn: checkPermission('sys_editor_drafts', false),
      publishBtn: checkPermission('sys_publish_drafts', false),
      delBtn: checkPermission('sys_delete_drafts', false)
    } as PermissionsBtn
  })

  provide('permission', permission.value)

  const wechatMpAppId = ref<string>('')
  const page = reactive<Pagination>({ current: 1, size: 10, total: 0 })

  const data = ref<Draft[]>([])

  const defaultFormData: NewsItem = {
    title: '',
    author: '',
    digest: '',
    content: '',
    contentSourceUrl: '',
    thumbMediaId: '',
    showCoverPic: 0,
    needOpenComment: 0,
    onlyFansCanComment: 0,
    url: '',
    thumbUrl: ''
  }

  const formData = ref<NewsItem>(defaultFormData)

  /**
   * 获取列表
   */
  const onload = async (wechatSummary?: WeChatSummary) => {
    if (!isNullOrUnDef(wechatSummary) && !isNullOrUnDef(wechatSummary.appId)) {
      wechatMpAppId.value = wechatSummary.appId
    }
    if (isNullOrUnDef(wechatMpAppId.value) || isEmpty(wechatMpAppId.value)) {
      return
    }
    data.value = []
    const response = await draftPage(wechatMpAppId.value, page)
    page.total = response.total
    data.value = response.records
    return response.records
  }

  /**
   * 删除指定草稿
   * @param mediaId
   */
  const toDeleteDraft = (mediaId: string) => {
    ElMessageBox.confirm('确认删除?').then(() => {
      return deleteDraft(wechatMpAppId.value, mediaId).then(() => {
        setTimeout(() => {
          onload()
        }, 1000)
      })
    })
  }
  /**
   * 去编辑草稿
   * @param news 编辑的草稿
   * @param mediaId
   */
  const toEditDraft = (news: NewsItem, mediaId: string) => {
    if (!eidtorRef.value) return
    news.content = news.content.replaceAll('data-src', 'src')
    formData.value = news
    eidtorRef.value.init({
      appid: wechatMpAppId.value,
      contextMediaId: mediaId,
      formData: formData.value
    } as EditorProps)
  }

  const toCreateDraft = (eidtorEl: EidtorInstance | undefined) => {
    if (!eidtorEl) return
    eidtorEl.init({
      appid: wechatMpAppId.value
    } as EditorProps)
  }

  const toPublishDraft = (mediaId: string) => {
    ElMessageBox.confirm('确认发布吗?').then(() => {
      return publish(unref(wechatMpAppId), mediaId).then(() => {
        setTimeout(() => {
          onload()
        }, 1000)
      })
    })
  }
</script>
<style lang="scss">
  .image-container {
    background-color: #e3e4e5;
    width: 100%;
    height: 150px;
  }
  .first-image {
    width: 100%;
    height: 100% !important;
  }

  .margin {
    margin: 0 0 5px;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;

    &:hover,
    &:focus,
    &:active {
      .common-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        top: 10px;
      }
      .delete {
        right: 10px;
      }

      .edit {
        right: 50px;
      }
      .publish {
        right: 90px;
      }
    }
  }
  .context {
    width: 100%;
  }

  .common-item {
    display: none;
  }

  .title__wrp {
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    position: relative;
  }
  .title {
    margin-bottom: 8px;
    color: #353535;
    font-size: 16px;
    font-family: PingFang SC;
    margin: 15px 8px 15px 15px;
    padding: 0;
    line-height: 1.2;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-decoration: none;
  }

  .desc {
    font-size: 14px;
    padding: 0 15px;
    color: #7e8081;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .updateTime {
    padding: 20px 15px 10px;
    color: #b1b2b3;
  }
</style>

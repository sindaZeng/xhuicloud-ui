<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <select-wechat-vue @after-select="onload" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card>
        <template v-if="permission.addBtn" #header>
          <el-button type="success" @click="toCreateDraft">新的创作</el-button>
        </template>
        <el-empty v-if="data.length === 0" :image-size="200" />
        <el-row v-else :gutter="10">
          <el-col v-for="draft in data" :key="draft.mediaId" :xs="8" :sm="6" :md="6" :lg="8" :xl="6">
            <el-card :body-style="{ padding: 0 }" shadow="hover">
              <div class="container">
                <div class="image-container">
                  <img
                    v-if="draft.content.newsItem[0].thumbUrl"
                    class="image"
                    :src="draft.content.newsItem[0].thumbUrl"
                  />
                </div>
                <div class="context">
                  <span class="title__wrp">
                    <a :href="draft.content.newsItem[0].url" target="_blank" class="title">
                      <span>{{ draft.content.newsItem[0].title }}</span>
                    </a>
                  </span>
                  <p title="正文" class="desc">{{ draft.content.newsItem[0].digest }}</p>
                  <p title="更新时间" class="desc updateTime">更新于 {{ formatDateTime(draft.updateTime) }}</p>
                </div>

                <div v-if="permission.delBtn" class="delete-item">
                  <el-tooltip content="删除" placement="top">
                    <el-button :icon="Delete" size="default" circle @click="toDeleteDraft(draft)"></el-button>
                  </el-tooltip>
                </div>
                <div v-if="permission.editBtn" class="edit-item">
                  <el-tooltip content="编辑" placement="top">
                    <el-button
                      :icon="Edit"
                      size="default"
                      circle
                      @click="toEditDraft(draft.content.newsItem[0], draft.mediaId)"
                    ></el-button>
                  </el-tooltip>
                </div>
                <div v-if="permission.publishBtn" class="publish-item">
                  <el-tooltip content="发布" placement="top">
                    <el-button :icon="Promotion" size="default" circle @click="toPublishDraft(draft.mediaId)">
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
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
        <el-dialog
          v-model="editialogVisible"
          :title="contextMediaId === '' ? '新增' : '编辑'"
          :append-to-body="true"
          width="90%"
        >
          <el-form
            ref="formRef"
            label-position="top"
            label-width="100px"
            :rules="rules"
            :inline="true"
            :model="formData"
          >
            <el-form-item class="formItem" label="标题" prop="title">
              <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item class="formItem" label="作者" prop="author">
              <el-input v-model="formData.author" />
            </el-form-item>

            <el-form-item class="formItem" label="原文链接">
              <el-input v-model="formData.contentSourceUrl" placeholder="图文消息的原文地址,即点击“阅读原文”后的URL" />
            </el-form-item>

            <el-form-item class="formItem" label="摘要">
              <el-input
                v-model="formData.digest"
                autosize
                type="textarea"
                placeholder="摘要内容,本字段为没有填写,则默认抓取正文前54个字"
              />
            </el-form-item>

            <el-form-item class="formContent" label="封面图片" prop="thumbUrl">
              <el-icon v-if="!formData.thumbUrl" :size="35" @click="toCheckImage">
                <Plus />
              </el-icon>
              <img v-else :src="formData.thumbUrl" width="200" height="100" @click="toCheckImage" />
            </el-form-item>

            <el-form-item label="是否显示封面">
              <el-radio-group v-model="formData.showCoverPic">
                <el-radio v-for="item in baseBoolean" :key="item.label" :label="item.label" size="large" border>
                  {{ item.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否打开评论">
              <el-radio-group v-model="formData.needOpenComment">
                <el-radio v-for="item in baseBoolean" :key="item.label" :label="item.label" size="large" border>
                  {{ item.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否粉丝才可评论">
              <el-radio-group v-model="formData.onlyFansCanComment">
                <el-radio v-for="item in baseBoolean" :key="item.label" :label="item.label" size="large" border>
                  {{ item.value }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="formContent" label="正文" prop="formContent">
              <xh-editor v-model:model-value="formData.content" :images-upload="imagesUpload"></xh-editor>
            </el-form-item>
          </el-form>
          <el-dialog v-model="thumbImageVisible" title="封面选择" width="80%" :append-to-body="true">
            <material-image
              v-model:media-id="thumbMediaId"
              v-model:media-url="mediaUrl"
              :data="materialData"
              :appid="wechatMpAppId"
              :multi-select="false"
              @onload="getMaterialPage"
            ></material-image>
            <el-pagination
              v-model:current-page="imagePage.current"
              v-model:page-size="imagePage.size"
              :total="imagePage.total"
              @size-change="getMaterialPage"
              @current-change="getMaterialPage"
            />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="thumbImageVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmCheckImage"> 确认 </el-button>
              </span>
            </template>
          </el-dialog>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelEditDraft(formRef)">取消</el-button>
              <el-button
                type="primary"
                @click="contextMediaId === '' ? confirmCreateDraft(formRef) : confirmEditDraft(formRef)"
              >
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </xh-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { Delete, Edit, Promotion } from '@element-plus/icons-vue'
  import { createDraft, deleteDraft, draftPage, editDraft } from '@/api/wechat/draft'
  import { Pagination } from '@/components/XhTable/pagination'
  import { isEmpty, isNullOrUnDef } from '@/utils/is'
  import { formatDateTime } from '@/utils/date'
  import { computed, reactive, ref, unref } from 'vue'
  import selectWechatVue from '../components/selectWechat.vue'
  import { ElMessageBox, FormInstance, FormRules } from 'element-plus'
  import materialImage from '../material/components/image.vue'
  import { Material } from '@/api/wechat/entity/material'
  import { materialPage, uploadImageMaterialFile } from '@/api/wechat/material'
  import { baseBoolean } from '@/api/base/baseEntity'
  import { cloneDeep } from 'lodash'
  import { publish } from '@/api/wechat/publish'
  import { checkPermission } from '@/utils'
  import { UploadFileParams } from '@/api/base'

  const rules = reactive<FormRules>({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    author: [
      {
        required: true,
        message: '请输入作者',
        trigger: 'blur'
      }
    ],
    thumbUrl: [
      {
        required: true,
        message: '请选择封面',
        trigger: 'blur'
      }
    ],
    formContent: [
      {
        required: true,
        message: '请输入正文内容,长度最低为20字',
        trigger: 'blur'
      },
      { min: 20, max: 2000000, message: '长度最低为20字', trigger: 'blur' }
    ]
  })
  const formRef = ref<FormInstance>()
  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_drafts', false),
      editBtn: checkPermission('sys_editor_drafts', false),
      publishBtn: checkPermission('sys_publish_drafts', false),
      delBtn: checkPermission('sys_delete_drafts', false)
    }
  })

  const wechatMpAppId = ref<string>('')
  const page = reactive<Pagination>({ current: 1, size: 10, total: 0 })
  const imagePage = reactive<Pagination>({ current: 1, size: 10, total: 0 })
  const data = ref<Draft[]>([])
  const thumbMediaId = ref<string>('')
  const contextMediaId = ref<string>('')
  const mediaUrl = ref<string>('')
  const materialData = ref<Material[]>([])

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

  const formData = ref<NewsItem>(cloneDeep(defaultFormData))
  const editialogVisible = ref(false)
  const thumbImageVisible = ref(false)

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

  const imagesUpload = async (blobInfo: any) => {
    const uploadFileParams: UploadFileParams = {
      file: blobInfo.blob(),
      params: { type: 'image' }
    }
    const res = await uploadImageMaterialFile(unref(wechatMpAppId), uploadFileParams)
    return res.url
  }
  /**
   * 去选图片素材
   */
  const toCheckImage = () => {
    getMaterialPage()
    thumbImageVisible.value = true
  }
  /**
   * 选中图片素材
   */
  const confirmCheckImage = () => {
    formData.value.thumbMediaId = thumbMediaId.value
    formData.value.thumbUrl = mediaUrl.value
    thumbImageVisible.value = false
  }

  /**
   * 图片素材列表
   */
  const getMaterialPage = async () => {
    if (isNullOrUnDef(wechatMpAppId.value) || isEmpty(wechatMpAppId.value)) {
      return
    }
    data.value = []
    const response = await materialPage(wechatMpAppId.value, { ...imagePage, type: 'image' })
    imagePage.total = response.total
    materialData.value = response.records
    return response.records
  }

  /**
   * 删除指定草稿
   * @param draft
   */
  const toDeleteDraft = (draft: Draft) => {
    ElMessageBox.confirm('确认删除?').then(() => {
      return deleteDraft(wechatMpAppId.value, draft.mediaId).then(() => {
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
    contextMediaId.value = mediaId
    news.content = news.content.replaceAll('data-src', 'src')
    formData.value = news
    editialogVisible.value = true
  }

  const toCreateDraft = () => {
    editialogVisible.value = true
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

  const confirmEditDraft = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const wxMpUpdateDraft: WxMpUpdateDraft = {
          mediaId: unref(contextMediaId),
          articles: unref(formData)
        }
        editDraft(unref(wechatMpAppId), wxMpUpdateDraft).then(() => {
          cancelEditDraft(formEl)
        })
      }
    })
  }

  const confirmCreateDraft = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        createDraft(unref(wechatMpAppId), unref(formData)).then(() => {
          cancelEditDraft(formEl)
        })
      }
    })
  }

  const cancelEditDraft = (formEl: FormInstance | undefined) => {
    contextMediaId.value = ''
    formData.value = cloneDeep(defaultFormData)
    editialogVisible.value = false
    formEl?.resetFields()
  }
</script>
<style lang="scss" scoped>
  .image-container {
    background-color: #e3e4e5;
    width: 100%;
    height: 60%;
    overflow: hidden;
    position: absolute;
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .container {
    position: relative;
    width: 100%;
    min-width: 310px;
    margin: 0 0 20px;
    height: 100%;
    min-height: 300px;

    &:hover,
    &:focus,
    &:active {
      .delete-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        right: 10px;
        top: 10px;
      }

      .edit-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        right: 50px;
        top: 10px;
      }
      .publish-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        right: 90px;
        top: 10px;
      }
    }
  }
  .context {
    position: absolute;
    width: 100%;
    height: 40%;
    bottom: 0;
  }

  .delete-item {
    display: none;
  }
  .edit-item {
    display: none;
  }
  .publish-item {
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
    padding: 0 15px;
    color: #7e8081;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .updateTime {
    padding: 10px 15px 16px;
    color: #b1b2b3;
  }
  .formContent {
    width: 80vw !important;
  }
  .formItem {
    width: 30vw !important;
  }
</style>

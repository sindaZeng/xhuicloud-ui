<!-- 文章编辑 -->
<template>
  <el-form ref="formRef" label-position="top" label-width="100px" :rules="rules" :inline="true" :model="formData">
    <el-form-item class="formItem" label="标题" prop="title">
      <el-input v-model="formData.title">
        <template #append>{{ formData.title.length + '/64' }}</template>
      </el-input>
    </el-form-item>
    <el-form-item class="formItem" label="作者" prop="author">
      <el-input v-model="formData.author">
        <template #append>{{ formData.title.length + '/8' }}</template>
      </el-input>
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
    <el-form-item class="formContent" label="正文" prop="content">
      <xh-editor v-model:model-value="formData.content" :images-upload="imagesUpload"></xh-editor>
    </el-form-item>
  </el-form>
  <el-dialog v-model="thumbImageVisible" title="封面选择" width="80%" :append-to-body="true" class="topDialog">
    <material-image
      v-model:media-id="thumbMediaId"
      v-model:media-url="thumbUrl"
      :data="materialData"
      :appid="appid"
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
  <el-button type="primary" :loading-icon="Eleme" :loading="loading" @click="save(formRef)"> 保存草稿 </el-button>
  <el-button :loading-icon="Eleme" :loading="loading" @click="$emit('toPublishDraft')"> 发布草稿 </el-button>
</template>
<script lang="ts" setup>
  import { UploadFileParams } from '@/api/base'
  import { Material } from '@/api/wechat/entity/material'
  import { materialPage, uploadImageMaterialFile } from '@/api/wechat/material'
  import { Pagination } from '@/components/XhTable/pagination'
  import { isEmpty, isNullOrUnDef } from '@/utils/is'
  import { FormInstance, FormRules } from 'element-plus'
  import { reactive, ref } from 'vue'
  import materialImage from '../material/components/image.vue'
  import { baseBoolean } from '@/api/base/baseEntity'
  import { Eleme } from '@element-plus/icons-vue'

  const loading = ref(false)

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
  const emits = defineEmits(['saveDraft', 'toPublishDraft'])

  const imagePage = reactive<Pagination>({ current: 1, size: 10, total: 0 })
  const thumbMediaId = ref<string>('')
  const thumbUrl = ref<string>('')
  const contextMediaId = ref<string>('')
  const materialData = ref<Material[]>([])
  const formRef = ref<FormInstance>()
  const formData = ref<NewsItem>(defaultFormData)
  const appid = ref<string>('')
  const thumbImageVisible = ref(false)

  const rules = reactive<FormRules>({
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { min: 1, max: 64, message: '标题长度最少1位,最多64位!', trigger: 'blur' }
    ],
    author: [
      {
        required: true,
        message: '请输入作者',
        trigger: 'blur'
      },
      { min: 1, max: 8, message: '作者长度最少1位,最多8位!', trigger: 'blur' }
    ],
    thumbUrl: [
      {
        required: true,
        message: '请选择封面',
        trigger: 'blur'
      }
    ],
    content: [
      {
        required: true,
        message: '请输入正文内容',
        trigger: 'blur'
      }
    ]
  })

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
    formData.value.thumbUrl = thumbUrl.value
    thumbImageVisible.value = false
  }

  /**
   * 图片素材列表
   */
  const getMaterialPage = async () => {
    if (isNullOrUnDef(appid.value) || isEmpty(appid.value)) {
      return
    }
    const response = await materialPage(appid.value, { ...imagePage, type: 'image' })
    imagePage.total = response.total
    materialData.value = response.records
    return response.records
  }

  const imagesUpload = async (blobInfo: any) => {
    const uploadFileParams: UploadFileParams = {
      file: blobInfo.blob(),
      params: { type: 'image' }
    }
    const res = await uploadImageMaterialFile(appid.value, uploadFileParams)
    return res.url
  }

  const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    await formEl.validate((valid) => {
      if (valid) {
        emits('saveDraft')
      }
    })
    const timer = setTimeout(() => {
      loading.value = true
      clearTimeout(timer)
    }, 200)
  }

  const init = (props: EditorProps) => {
    appid.value = props.appid
    if (isNullOrUnDef(props.formData)) {
      formData.value = defaultFormData
    } else {
      formData.value = props.formData
    }
    if (!isNullOrUnDef(props.contextMediaId)) {
      contextMediaId.value = props.contextMediaId
    }
  }

  defineExpose({ init })
</script>
<style lang="scss" scoped>
  .formContent {
    width: 80vw !important;
  }
  .formItem {
    width: 30vw !important;
  }
</style>

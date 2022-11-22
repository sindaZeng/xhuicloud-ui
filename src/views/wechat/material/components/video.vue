<template>
  <Crud
    :enable-operations="true"
    :table-column="tableColumn"
    :data="data"
    :card-style="false"
    :permission="permission"
    :table="{ border: true }"
    @toDelRow="toDeleteMaterial"
  >
    <!-- 行操作插槽 注:必须tableOperation -->
    <template #tableOperation="row">
      <el-button size="small" @click="toDownloadVideo(row.data.mediaId)">
        <el-icon class="el-icon--left">
          <xh-svg icon="download"></xh-svg>
        </el-icon>
        下载
      </el-button>
    </template>
    <!-- 头操作插槽 注:必须headOperation -->
    <template #headOperation>
      <!-- <el-upload
        v-if="checkPermission('sys_add_material', false)"
        v-model:file-list="files"
        class="global_info_btn"
        :action="action"
        :headers="headers"
        :data="{ type: 'image' }"
        :before-upload="beforeUpload"
        :on-success="reload"
        :show-file-list="false"
        :limit="1"
      > -->
      <el-button type="primary" :icon="Upload" @click="centerDialogVisible = true"> 上传素材 </el-button>
      <!-- <template #tip>
          <div class="el-upload__tip">
            {{ tips1 }}
            <strong>{{ tips2 }}</strong>
          </div>
        </template>
      </el-upload> -->
    </template>
  </Crud>
  <el-dialog v-model="centerDialogVisible" title="添加视频" width="60%" align-center>
    <el-upload
      ref="uploadRef"
      v-model:file-list="formData.multipartFile"
      :limit="1"
      :auto-upload="false"
      :on-exceed="onExceed"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">{{ tips }}</div>
      </template>
    </el-upload>
    <el-form
      ref="formRef"
      label-width="100px"
      label-position="left"
      :model="formData"
      :rules="rules"
      style="max-width: 80%"
    >
      <el-form-item label="视频标题" prop="videoTitle">
        <el-input
          v-model="formData.videoTitle"
          placeholder="标题将展示在相关播放页面，建议填写清晰、准确、生动的标题"
        />
      </el-form-item>
      <el-form-item label="视频介绍" prop="videoIntroduction">
        <el-input
          v-model="formData.videoIntroduction"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10 }"
          placeholder="介绍语将展示在相关播放页面，建议填写简洁明确、有信息量的内容"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading-icon="Eleme" :loading="loading" @click="toUploadVideoMaterialFile(formRef)">
          上传
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { PermissionsBtn } from '@/components/XhTable/crud'
  import { Upload, Eleme } from '@element-plus/icons-vue'
  import { downloadVideo, uploadVideoMaterialFile } from '@/api/wechat/material'
  import { checkPermission } from '@/utils'
  import { PropType, ref, reactive } from 'vue'
  import { tableColumn } from './voiceAndvideo'
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import { ElMessage, ElNotification, FormInstance, FormRules, genFileId, UploadRawFile } from 'element-plus'
  import type { UploadInstance } from 'element-plus'
  import { isNullOrUnDef } from '@/utils/is'
  import { UploadFileParams } from '@/api/base'
  import { Material, VideoMaterial } from '@/api/wechat/entity/material'
  const formRef = ref<FormInstance>()
  const rules = reactive<FormRules>({
    videoTitle: [{ required: true, message: '请输入视频标题', trigger: 'blur' }],
    videoIntroduction: [{ required: true, message: '请输入视频介绍', trigger: 'blur' }]
  })

  const uploadRef = ref<UploadInstance>()
  const props = defineProps({
    data: { type: Array as PropType<Material[]>, default: () => [] },
    appid: { type: String as PropType<string>, default: () => '' }
  })
  const centerDialogVisible = ref(false)
  const loading = ref(false)

  const formData = reactive<VideoMaterial>({
    videoTitle: '',
    videoIntroduction: '',
    multipartFile: []
  })

  const tips = '视频格式支持MP4,且文件大小不超过10MB'
  const { beforeUpload } = useUploadFiles({ fileType: ['mp4'], fileSize: 10 })

  const emit = defineEmits(['onload', 'update:mediaIds', 'toDeleteMaterial'])

  const reload = () => {
    ElNotification({
      title: '上传成功',
      type: 'success'
    })
    centerDialogVisible.value = false
    emit('onload')
    formData.videoIntroduction = ''
    formData.videoTitle = ''
    formData.multipartFile = []
  }

  const toDeleteMaterial = (material: Material) => {
    emit('toDeleteMaterial', material)
  }
  const toDownloadVideo = (mediaId: string) => {
    downloadVideo(props.appid, mediaId).then((res) => {
      const url = res.downUrl
      const link = document.createElement('a')
      link.href = url
      link.target = '_blank'
      link.setAttribute('download', mediaId)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    })
  }

  const permission: PermissionsBtn = {
    addBtn: false,
    editBtn: false,
    delBtn: checkPermission('sys_delete_material', false),
    importBtn: false,
    exportBt: false,
    refreshBtn: false,
    viewBtn: false
  }

  const toUploadVideoMaterialFile = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    if (isNullOrUnDef(formData.multipartFile) || formData.multipartFile.length === 0) {
      ElMessage({
        message: `请选择需要上传的视频文件`,
        type: 'error'
      })
      return
    }
    const raw: UploadRawFile = formData.multipartFile[0].raw!
    loading.value = true
    // 校验文件大小以及格式
    if (beforeUpload(raw)) {
      formEl.validate((valid) => {
        if (valid) {
          const uploadFileParams: UploadFileParams = {
            file: raw,
            params: { videoTitle: formData.videoTitle, videoIntroduction: formData.videoIntroduction }
          }
          uploadVideoMaterialFile(props.appid, uploadFileParams).then(() => {
            reload()
          })
        }
      })
    }
    loading.value = false
  }

  const onExceed = (files: File[]) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
  }
</script>
<style lang="scss" scoped>
  .el-upload__tip {
    color: red;
  }
</style>

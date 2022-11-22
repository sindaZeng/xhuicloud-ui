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
      <el-button size="small" @click="download(appid, row.data.name, row.data.mediaId)">
        <el-icon class="el-icon--left">
          <xh-svg icon="download"></xh-svg>
        </el-icon>
        下载
      </el-button>
    </template>
    <!-- 头操作插槽 注:必须headOperation -->
    <template #headOperation>
      <el-upload
        v-if="checkPermission('sys_add_material', false)"
        v-model:file-list="files"
        class="global_info_btn"
        :action="action"
        :headers="headers"
        :data="{ type: 'voice' }"
        :before-upload="beforeUpload"
        :on-success="reload"
        :show-file-list="false"
        :limit="1"
      >
        <el-button type="primary" :icon="Upload"> 上传素材 </el-button>
        <template #tip>
          <div class="el-upload__tip">
            {{ tips1 }}
            <strong>{{ tips2 }}</strong>
          </div>
        </template>
      </el-upload>
    </template>
  </Crud>
</template>
<script lang="ts" setup>
  import { PermissionsBtn } from '@/components/XhTable/crud'
  import { Upload } from '@element-plus/icons-vue'
  import { download } from '@/api/wechat/material'
  import { checkPermission } from '@/utils'
  import { computed, PropType, ref } from 'vue'
  import { tableColumn } from './voiceAndvideo'
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import { ElNotification, UploadUserFile } from 'element-plus'
  import { Material } from '@/api/wechat/entity/material'
  const props = defineProps({
    data: { type: Array as PropType<Material[]>, default: () => [] },
    appid: { type: String as PropType<string>, default: () => '' }
  })

  const files = ref<UploadUserFile[]>()

  const tips1 = '格式支持mp3、wma、wav、amr、m4a,文件大小不超过200M,音频时长不超过2小时。'
  const tips2 = '上传后音频将由微信进行转码和审核通过后才在这显示。'
  const action = computed(() => import.meta.env.VITE_BASE_API + `/wechat/material/${props.appid}`)
  const { headers, beforeUpload } = useUploadFiles({ fileType: ['mp3', 'wma', 'wav', 'amr', 'm4a'], fileSize: 200 })

  const emit = defineEmits(['onload', 'update:mediaIds', 'toDeleteMaterial'])

  const reload = () => {
    ElNotification({
      title: '上传成功',
      type: 'success'
    })
    emit('onload')
    files.value = []
  }

  const toDeleteMaterial = (material: Material) => {
    emit('toDeleteMaterial', material)
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
</script>
<style lang="scss" scoped>
  .el-upload__tip {
    color: red;
  }

  .global_info_btn {
    float: left;
    margin-bottom: 20px;
  }
</style>

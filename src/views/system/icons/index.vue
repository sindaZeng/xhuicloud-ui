<template>
  <xh-icon-view v-model:loading="loading" :custom-labs="customLabs">
    <template #icon-item-0>
      <div class="icon-item">
        <el-upload
          class="avatar-uploader"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :action="action"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div v-for="item in icons" :key="item.id" class="icon-item">
        <xh-svg class="icons" :icon="pathPrefix + item.url" />
        <el-tooltip effect="dark" :content="item.name" placement="top">
          <span>{{ item.name }}</span>
        </el-tooltip>
        <div class="delete-item">
          <el-button :icon="Delete" size="default" circle @click="toDelRow(item)"></el-button>
        </div>
      </div>
    </template>
  </xh-icon-view>
</template>
<script lang="ts" setup>
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import { ref } from 'vue'
  import { Plus, Delete } from '@element-plus/icons-vue'
  import { deleteFile, filePage } from '@/api/upms/file'
  import { ElMessageBox } from 'element-plus'

  const { headers, action, beforeUpload, pathPrefix } = useUploadFiles({ fileType: ['image/svg+xml'] })
  const imageUrl = ref<string>('')
  const customLabs = ref<string[]>(['云端icon'])
  const loading = ref<boolean>(false)
  const icons = ref<SysFile[]>([])

  const getIcons = async () => {
    loading.value = true
    const { records } = await filePage({ fileType: 'svg' })
    icons.value = records
    loading.value = false
  }
  const onSuccess = () => {
    getIcons()
  }
  const toDelRow = (formModel: SysFile) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.id} ?`).then(() => {
      return deleteFile(formModel.id).then(() => {
        getIcons()
      })
    })
  }
  getIcons()
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 30px;
    color: #8c939d;
    width: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    display: block;
  }
  .icon-item {
    position: relative;
    .delete-item {
      display: none;
    }
    &:hover {
      .icons {
        width: 1.5em;
        height: 1.5em;
      }
      .delete-item {
        position: absolute;
        display: inline-block;
        right: -10px;
        top: -20px;
      }
    }
  }
</style>

<template>
  <el-upload class="avatar-uploader" v-bind="props" :on-success="onSuccess" :before-upload="onBeforeUpload">
    <img v-if="url" style="width: 50px; height: 50px" :src="url" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>
<script lang="ts" setup>
  import {} from 'vue'
  import { UploadFile, UploadFiles, uploadProps, UploadRawFile } from 'element-plus'
  import { useVModel } from '@vueuse/core'
  import { isNullOrUnDef } from '@/utils/is'

  const props = defineProps({
    ...uploadProps,
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const url = useVModel(props, 'modelValue', emit)

  const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    url.value = import.meta.env.VITE_OSS_DOMAIN + response.data
    if (!isNullOrUnDef(props.onSuccess)) {
      return props.onSuccess(response, uploadFile, uploadFiles)
    }
  }

  const onBeforeUpload = (rawFile: UploadRawFile) => {
    if (!isNullOrUnDef(props.beforeUpload)) {
      return props.beforeUpload(rawFile)
    }
  }
</script>
<style lang="scss" scoped></style>

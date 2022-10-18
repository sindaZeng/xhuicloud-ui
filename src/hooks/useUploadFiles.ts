import { FileApi } from '@/api/upms/file'
import useStore from '@/store'
import { ElMessage, UploadRawFile } from 'element-plus'

const { user } = useStore()

const headers = { Authorization: 'Bearer ' + user.getToken }

const action = import.meta.env.VITE_BASE_API + FileApi.FileUpload

export interface UseUploadFilesParams {
  fileType?: string
  fileSize?: number // 文件大小 默认不能超过2M
}
export function useUploadFiles({ fileType = 'image/png', fileSize = 2 }: UseUploadFilesParams) {
  const beforeUpload = (rawFile: UploadRawFile) => {
    return checkFileType(rawFile) && checkFileSize(rawFile)
  }

  const checkFileType = (rawFile: UploadRawFile) => {
    const isFileType = rawFile.type === fileType
    if (!isFileType) {
      ElMessage({
        message: `上传的文件类型只能是${fileType}格式!`,
        type: 'warning'
      })
    }
    return isFileType
  }

  const checkFileSize = (rawFile: UploadRawFile) => {
    const isLt = rawFile.size / 1024 / 1024 < fileSize
    if (!isLt) {
      ElMessage({
        message: `上传${fileType}大小不能超过 ${fileSize}MB!`,
        type: 'warning'
      })
    }
    return isLt
  }
  return { headers, action, beforeUpload, pathPrefix: import.meta.env.VITE_OSS_DOMAIN }
}

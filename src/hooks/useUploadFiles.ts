import { FileApi } from '@/api/upms/file'
import useStore from '@/store'
import { ElMessage, UploadRawFile } from 'element-plus'

const { user } = useStore()

const headers = { Authorization: 'Bearer ' + user.getToken }

export interface UseUploadFilesParams {
  fileType?: string[]
  fileSize?: number // 文件大小 默认不能超过2M
  actionUrl?: string // 请求地址
}
export function useUploadFiles({
  fileType = ['image/png'],
  fileSize = 2,
  actionUrl = FileApi.FileUpload
}: UseUploadFilesParams) {
  const beforeUpload = (rawFile: UploadRawFile) => {
    return checkFileType(rawFile) && checkFileSize(rawFile)
  }

  const checkFileType = (rawFile: UploadRawFile) => {
    const type: string[] = rawFile.name.split('.')
    const isFileType = fileType.indexOf(rawFile.type) >= 0 || fileType.indexOf(type[type.length - 1]) >= 0
    if (!isFileType) {
      ElMessage({
        message: `上传的文件类型只能是${fileType.join(',')}格式!`,
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
  return {
    headers,
    action: import.meta.env.VITE_BASE_API + actionUrl,
    beforeUpload,
    pathPrefix: import.meta.env.VITE_OSS_DOMAIN
  }
}

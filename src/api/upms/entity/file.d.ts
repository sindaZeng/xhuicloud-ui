interface SysFile {
  id: number
  url: string
  fileName: string
  name: string
  fileSize: string
  fileType: string
  bucketName: string
  createTime: string
  createId: number
  updateTime?: string
  updateId?: number
  isDel: number
  tenantId: number
}

export interface Page<T> {
  records: T[]
  total: number
  size: number
  current: number
}

export interface BaseEntity {
  id?: number
  createTime?: string
  createId?: number
  updateId?: any
  updateTime?: string
  isDel?: number
}

interface UploadFileParams {
  file: File | Blob
  filename?: string
  data?: Recordable
  params?: Recordable
  [key: string]: any
}

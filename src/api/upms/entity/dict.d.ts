interface SysDict {
  id: number
  type: string
  description: string
  remark: string
  sort?: number
  createTime: string
  createId: number
  updateTime: string
  updateId: number
  isDel: number
}

interface SysDictData {
  id: number
  dictId: number
  type: string
  label: string
  value?: string
  description: string
  remarks: string
  sort: number
  createTime: string
  createId: number
  updateTime: string
  updateId?: number
  isDel: number
}

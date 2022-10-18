interface Dept {
  label: string
  value: number
  id: number
  parentId: number
  children: Dept[]
  name: string
  address: string
  createTime: any
}

interface SysDept {
  id: number
  name: string
  address?: any
  parentId: number
  sort: number
  createTime: string
  createId: number
  updateTime: string
  updateId?: any
  isDel: number
  tenantId: number
}

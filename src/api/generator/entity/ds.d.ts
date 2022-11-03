interface GenDsInfo {
  id: number
  name: string
  type: string
  username: string
  password: string
  host: string
  port?: string
  createTime: string
  updateTime: string
  isDel: number
}

interface TableInfo {
  tableName: string
  engine: string
  tableComment: string
  createTime: string
}

interface GenCode {
  id?: number
  tableName?: string[]
  toReplace?: number[]
  moduleName?: string
  contextPath?: string
  packagePath?: string
  author?: string
  tablePrefix?: string
  genWeb?: number
  isTs?: number
}

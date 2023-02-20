interface AuditRecord {
  id: number
  reqId: string
  requestIp: string
  serviceSystem: string
  operator: string
  detail: string
  classPath: string
  requestMethod: string
  requestUri: string
  httpMethod: string
  params: string
  result: string
  status: number
  errorMsg: string
  createTime: string
}

interface AuditLogin {
  id: number
  username: string
  userId: number
  loginTime: string
  ip: string
  useragent: string
  status: number
  remake?: any
}

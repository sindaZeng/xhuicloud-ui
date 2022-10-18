interface SysLog {
  id: string
  requestIp: string
  type: string
  userName: string
  description: string
  classPath: string
  requestMethod: string
  requestUri: string
  httpMethod: string
  params: string
  result: string
  exDesc: string
  exDetail: string
  createTime: string
  finishTime: string
  time: string
  userAgent: string
  isDel: number
  tenantId: number
}

interface SysLogLogin {
  id: number
  username: string
  userId: number
  loginTime: string
  ip: string
  useragent: string
  status: number
  remake?: any
}

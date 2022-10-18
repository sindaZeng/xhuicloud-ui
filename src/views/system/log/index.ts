import { TableColumn } from '@/components/XhTable/crud'

export const logTableColumn: TableColumn[] = [
  {
    label: '编号',
    prop: 'id'
  },
  {
    label: '操作IP',
    prop: 'requestIp',
    searchForm: {}
  },
  {
    label: '操作人',
    prop: 'userName'
  },
  {
    label: '操作描述',
    prop: 'description'
  },
  {
    label: '类路径',
    prop: 'classPath'
  },
  {
    label: '请求方法',
    prop: 'requestMethod'
  },
  {
    label: '请求地址',
    prop: 'requestUri'
  },
  {
    label: '请求类型',
    prop: 'httpMethod'
  },
  {
    label: '请求参数',
    prop: 'params'
  },
  {
    label: '返回值',
    prop: 'result'
  },
  {
    label: '异常详情信息',
    prop: 'exDesc'
  },
  {
    label: '异常描述',
    prop: 'exDetail'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '结束时间',
    prop: 'finishTime'
  },
  {
    label: '执行时间',
    prop: 'time'
  },
  {
    label: '浏览器',
    prop: 'userAgent'
  }
]

export const logLoginTableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id'
  },
  {
    label: '用户名称',
    prop: 'username',
    searchForm: {}
  },
  {
    label: '用户id',
    prop: 'userId',
    searchForm: {}
  },
  {
    label: 'ip',
    prop: 'ip',
    searchForm: {}
  },
  {
    label: 'UA',
    prop: 'useragent'
  },
  {
    label: '登录状态',
    prop: 'status'
  },
  {
    label: '备注',
    prop: 'remake'
  },
  {
    label: '登录时间',
    prop: 'loginTime'
  }
]

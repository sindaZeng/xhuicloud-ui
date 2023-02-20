import { TableColumn } from '@/components/XhTable/crud'

export const tableColumn: TableColumn[] = [
  {
    label: '编号',
    prop: 'id'
  },
  {
    label: '请求id',
    prop: 'reqId',
    searchForm: {}
  },
  {
    label: '操作IP',
    prop: 'requestIp',
    searchForm: {}
  },
  {
    label: '业务系统',
    prop: 'serviceSystem',
    searchForm: {}
  },
  {
    label: '操作人(id)',
    prop: 'operator',
    searchForm: {}
  },
  {
    label: '操作描述',
    prop: 'detail'
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
    prop: 'requestUri',
    searchForm: {}
  },
  {
    label: '请求类型',
    prop: 'httpMethod',
    searchForm: {}
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
    label: '请求状态',
    prop: 'status',
    // 回调返回 tag属性
    tag: (row: AuditRecord) => {
      return { type: row.status == 0 ? 'danger' : 'success' }
    },
    // 0: 失败 1: 成功
    valueFormat: (row: AuditRecord) => {
      return row.status == 0 ? '失败' : '成功'
    }
  },
  {
    label: '异常详情信息',
    prop: 'errorMsg'
  },
  {
    label: '创建时间',
    prop: 'createTime'
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

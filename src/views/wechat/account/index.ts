import { TableColumn } from '@/components/XhTable/crud'

export const tableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '公众号名称',
    prop: 'name',
    operationForm: {},
    searchForm: {}
  },
  {
    label: 'app-id',
    prop: 'appId',
    operationForm: {}
  },
  {
    label: 'app-secret',
    prop: 'appSecret',
    editDisplay: true,
    operationForm: {}
  },
  {
    label: 'auth-token',
    prop: 'appAuthToken',
    hidden: true,
    operationForm: {}
  },
  {
    label: '解密密钥',
    prop: 'appDecrypt',
    hidden: true,
    operationForm: {}
  },
  {
    label: '重定向url',
    prop: 'redirectUrl',
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

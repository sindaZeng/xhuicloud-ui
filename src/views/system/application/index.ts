import { TableColumn } from '@/components/XhTable/crud'

export const tableColumn: TableColumn[] = [
  {
    label: '编号',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '服务名称',
    prop: 'routeName',
    operationForm: {}
  },
  {
    label: '服务编号',
    prop: 'routeId',
    operationForm: {}
  },
  {
    label: '谓词/断言',
    prop: 'predicates',
    hidden: true
  },
  {
    label: '过滤器',
    prop: 'filters',
    hidden: true
  },
  {
    label: 'lb/轮询地址',
    prop: 'uri',
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

import { OptionsItem } from '@/components/XhForm/src/radioGroup'
import { TableColumn } from '@/components/XhTable/crud'

const options = [
  {
    value: 0,
    label: '系统参数'
  },
  {
    value: 1,
    label: '业务参数'
  }
] as OptionsItem[]

export const tableColumn: TableColumn[] = [
  {
    label: '参数主键',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {},
    searchForm: {}
  },
  {
    label: '参数键名',
    prop: 'paramKey',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入参数键名',
          trigger: 'blur'
        }
      ]
    },
    searchForm: {}
  },
  {
    label: '参数键值',
    prop: 'paramValue',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入参数键值',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '参数名称',
    prop: 'paramName',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入参数名称',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '参数类型',
    prop: 'paramType',
    tag: true,
    operationForm: {
      component: 'ElSelect',
      componentProps: { options },
      rules: [
        {
          required: true,
          message: '请输入参数类型',
          trigger: 'blur'
        }
      ]
    },
    searchForm: { component: 'ElSelect', componentProps: { options } },
    valueFormat: (row: SysParam) => {
      return options.find((x) => x.value === row.paramType)?.label
    }
  },
  {
    label: '备注',
    prop: 'remark',
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

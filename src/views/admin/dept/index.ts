import { TableColumn } from '@/components/XhTable/crud'

export const tableColumn: TableColumn[] = [
  {
    label: '部门id',
    prop: 'id',
    hidden: true,
    editDisabled: true,
    createDisabled: true
  },
  {
    label: '上级部门',
    prop: 'parentId',
    isFormItem: true,
    operationForm: {
      rules: [
        {
          required: true,
          message: '请选择上级部门',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '部门名称',
    prop: 'name',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '区域|地址|工位',
    prop: 'address',
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

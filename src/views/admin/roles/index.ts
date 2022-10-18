import { TableColumn } from '@/components/XhTable/crud'
import { ColProps } from 'element-plus'

const col = { xl: 24, lg: 24 } as ColProps

export const tableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '角色编码',
    prop: 'roleCode',
    operationForm: {
      col,
      rules: [
        {
          required: true,
          message: '角色编码不能为空',
          trigger: 'blur'
        }
      ]
    }
  },

  {
    label: '角色名称',
    prop: 'roleName',
    searchForm: {
      componentProps: { placeholder: '请输入角色名称' }
    },
    operationForm: {
      col,
      rules: [
        {
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '角色描述',
    prop: 'roleDesc',
    operationForm: {
      col,
      componentProps: {
        type: 'textarea'
      }
    }
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '更新时间',
    prop: 'updateTime'
  }
]

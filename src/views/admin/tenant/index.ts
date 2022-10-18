import { SysTenant } from '@/api/upms/entity/tenant'
import { OptionsItem } from '@/components/XhForm/src/radioGroup'
import { TableColumn } from '@/components/XhTable/crud'
import { useUploadFiles } from '@/hooks/useUploadFiles'
import { UploadRawFile } from 'element-plus'

const { headers, action, beforeUpload } = useUploadFiles({})

const options = [
  {
    value: 0,
    label: '禁用'
  },
  {
    value: 1,
    label: '正常'
  },
  {
    value: 2,
    label: '待审核'
  },
  {
    value: 3,
    label: '拒绝'
  }
] as OptionsItem[]

export const tableColumn: TableColumn[] = [
  {
    label: '租户id',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {},
    searchForm: {}
  },
  {
    label: '租户名称',
    prop: 'name',
    searchForm: {},
    operationForm: {
      rules: [
        {
          required: true,
          message: '租户名称不能为空',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '租户商标',
    prop: 'logo',
    image: true,
    operationForm: {
      component: 'ImgUpload',
      componentProps: {
        headers: headers,
        action: action,
        showFileList: false,
        beforeUpload: (rawFile: UploadRawFile) => {
          return beforeUpload(rawFile)
        }
      }
    }
  },
  {
    label: '租户状态',
    prop: 'state',
    tag: true,
    operationForm: {
      component: 'ElSelect',
      componentProps: { options },
      rules: [
        {
          required: true,
          message: '请选择租户状态',
          trigger: 'blur'
        }
      ]
    },
    searchForm: {
      component: 'ElSelect',
      componentProps: { options }
    },
    valueFormat: (row: SysTenant) => {
      return options.find((x) => x.value === row.state)?.label
    }
  },
  {
    label: '有效期',
    prop: 'expirationTime',
    operationForm: {
      component: 'ElDatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD hh:mm:ss'
      },
      rules: [
        {
          required: true,
          message: '请选择租户有效期',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

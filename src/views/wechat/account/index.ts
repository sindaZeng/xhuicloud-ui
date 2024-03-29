import { OptionsItem } from '@/components/XhForm/src/checkBoxGroup'
import { TableColumn } from '@/components/XhTable/crud'
import { useUploadFiles } from '@/hooks/useUploadFiles'
import { UploadRawFile } from 'element-plus'

const { headers, action, beforeUpload } = useUploadFiles({})
const options = [
  {
    value: '订阅号',
    label: 0
  },
  {
    value: '服务号',
    label: 1
  }
] as OptionsItem[]

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
    label: '公众号头像',
    prop: 'url',
    hidden: true,
    operationForm: {
      // 上传组件
      component: 'ImgUpload',
      componentProps: {
        headers: headers,
        action: action,
        showFileList: false,
        beforeUpload: (rawFile: UploadRawFile) => beforeUpload(rawFile)
      }
    }
  },
  {
    label: 'appid',
    prop: 'appId',
    hidden: true,
    operationForm: {}
  },
  {
    label: 'secret',
    prop: 'appSecret',
    hidden: true,
    operationForm: {}
  },

  {
    label: '类型',
    prop: 'type',
    tag: true,
    valueFormat: (row: Menu) => {
      return options.find((x) => x.label === row.type)?.value
    },
    operationForm: {
      component: 'RadioButtonGroup',
      componentProps: {
        options: options
      },
      rules: [
        {
          required: true,
          message: '请选择类型',
          trigger: 'blur'
        }
      ]
    }
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
    hidden: true,
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

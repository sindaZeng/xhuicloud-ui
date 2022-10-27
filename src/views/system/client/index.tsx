import { OptionsItem } from '@/components/XhForm/src/radioGroup'
import { TableColumn } from '@/components/XhTable/crud'

const isAutoApprove = [
  {
    value: '是',
    label: 'true'
  },
  {
    value: '否',
    label: 'false'
  }
] as OptionsItem[]

const authorizedGrantTypes = [
  {
    value: '密码模式',
    label: 'password'
  },
  {
    value: '授权码模式',
    label: 'authorization_code'
  },
  {
    value: '刷新模式',
    label: 'refresh_token'
  },
  {
    value: '客户端模式',
    label: 'client_credentials'
  },
  {
    value: '社交平台模式',
    label: 'social'
  },
  {
    value: '短信验证码模式',
    label: 'mobile'
  }
] as OptionsItem[]

export const clientTableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id',
    createDisabled: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '客户端名称',
    prop: 'name',
    searchForm: {},
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入客户端名称',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '客户端id',
    prop: 'clientId',
    operationForm: {},
    editDisabled: true,
    searchForm: {}
  },
  {
    label: '客户端密钥',
    prop: 'clientSecret',
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '自动授权',
    prop: 'autoApprove',
    operationForm: {
      component: 'RadioButtonGroup',
      componentProps: { options: isAutoApprove },
      rules: [
        {
          required: true,
          message: '请输入参数类型',
          trigger: 'blur'
        }
      ]
    },
    formatter: (row: SysClient) => {
      return isAutoApprove.find((x) => x.label === row.autoApprove)?.value
    }
  },
  {
    label: '授权范围',
    prop: 'scope',
    operationForm: {}
  },
  {
    label: '重定向地址',
    prop: 'webServerRedirectUri',
    operationForm: {
      width: '650px',
      col: { lg: 24, xl: 24 }
      // componentSlots: {
      //   prepend: () => {
      //     return <span>http://</span>
      //   }
      // }
    }
  },
  {
    label: '授权类型',
    prop: 'authorizedGrantTypes',
    operationForm: {
      width: '575px',
      col: { lg: 24, xl: 24 },
      component: 'CheckBoxGroup',
      componentProps: {
        options: authorizedGrantTypes
      }
    }
  },
  {
    label: '授权有效时间',
    prop: 'accessTokenValidity',
    operationForm: {
      component: 'ElInputNumber',
      componentProps: {
        min: 30000
      }
    }
  },
  {
    label: '刷新有效时间',
    prop: 'refreshTokenValidity',
    operationForm: {
      component: 'ElInputNumber',
      componentProps: {
        min: 30000
      }
    }
  },
  {
    label: '登录验证码',
    prop: 'captchaEnable',
    hidden: true,
    operationForm: {}
  },
  {
    label: '重复登录',
    prop: 'multiLogin',
    hidden: true,
    operationForm: {}
  },
  {
    label: '令牌模式',
    prop: 'tokenFormat',
    hidden: true,
    operationForm: {}
  }
]

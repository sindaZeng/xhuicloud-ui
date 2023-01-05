import { TableColumn } from '@/components/XhTable/crud'
import { global } from '@/i18n'

export const dsTableColumn: TableColumn[] = [
  {
    label: global.t('gen.Id'),
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: global.t('gen.Name'),
    prop: 'name',
    operationForm: {},
    searchForm: {}
  },
  {
    label: global.t('gen.Username'),
    prop: 'username',
    operationForm: {}
  },
  {
    label: global.t('gen.Password'),
    prop: 'password',
    hidden: true,
    operationForm: {
      componentProps: {
        showPassword: true
      }
    }
  },
  {
    label: global.t('gen.Host'),
    prop: 'host',
    hidden: true,
    operationForm: {}
  },
  {
    label: global.t('gen.Port'),
    prop: 'port',
    operationForm: {
      component: 'ElInputNumber'
    }
  },
  {
    label: global.t('gen.Type'),
    prop: 'type',
    operationForm: {}
  },
  {
    label: global.t('gen.CreateTime'),
    prop: 'createTime'
  }
]

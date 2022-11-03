import { TableColumn } from '@/components/XhTable/crud'
import i18n from '@/i18n'

export const dsTableColumn: TableColumn[] = [
  {
    label: i18n.global.t('gen.Id'),
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: i18n.global.t('gen.Name'),
    prop: 'name',
    operationForm: {},
    searchForm: {}
  },
  {
    label: i18n.global.t('gen.Username'),
    prop: 'username',
    operationForm: {}
  },
  {
    label: i18n.global.t('gen.Password'),
    prop: 'password',
    hidden: true,
    operationForm: {
      componentProps: {
        showPassword: true
      }
    }
  },
  {
    label: i18n.global.t('gen.Host'),
    prop: 'host',
    hidden: true,
    operationForm: {}
  },
  {
    label: i18n.global.t('gen.Port'),
    prop: 'port',
    operationForm: {
      component: 'ElInputNumber'
    }
  },
  {
    label: i18n.global.t('gen.Type'),
    prop: 'type',
    operationForm: {}
  },
  {
    label: i18n.global.t('gen.CreateTime'),
    prop: 'createTime'
  }
]

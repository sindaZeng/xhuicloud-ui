import { RenderParams } from '@/components/XhForm/form-item'
import { OptionsItem } from '@/components/XhForm/src/radioGroup'
import { TableColumn } from '@/components/XhTable/crud'
import IconSelect from './icon-select.vue'
const options = [
  {
    value: '菜单',
    label: 0
  },
  {
    value: '按钮',
    label: 1
  }
] as OptionsItem[]

export const tableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id',
    hidden: true,
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '名称',
    prop: 'name',
    operationForm: {
      rules: [
        {
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '图标',
    prop: 'icon',
    icon: true,
    operationForm: {
      component: ({ field, formModel }: RenderParams) => {
        return <IconSelect v-model:icon={formModel[field]} />
      }
    }
  },
  {
    label: '国际化',
    prop: 'internationalization',
    operationForm: {
      rules: [
        {
          required: true,
          message: '国际化不能为空',
          trigger: 'blur'
        }
      ]
    }
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
          message: '请选择菜单类型',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '路由路径',
    prop: 'path',
    operationForm: {}
  },
  {
    label: '授权标识',
    prop: 'permission',
    operationForm: {}
  },
  {
    label: '上级菜单',
    prop: 'parentId',
    isFormItem: true,
    operationForm: {
      rules: [
        {
          required: true,
          message: '请选择上级菜单',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '排序',
    prop: 'sort',
    operationForm: {
      component: 'ElInputNumber',
      componentProps: {
        min: 0
      }
    }
  }
]

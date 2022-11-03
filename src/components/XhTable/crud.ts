import { isNullOrUnDef, isObject } from '@/utils/is'
import { ExtractPropTypes, PropType } from 'vue'
import { FormActionButtonGroupProps } from '../XhForm/form-action'
import type { FormItem } from '../XhForm/form-item'
import { Pagination } from './pagination'

export interface Table {
  [key: string]: any
}

export interface TableColumn {
  label: string
  prop: string
  hidden?: boolean
  // 编辑不展示
  editDisplay?: boolean
  // 新增不展示
  createDisplay?: boolean
  // 编辑不可操作
  editDisabled?: boolean
  // 新增不可操作
  createDisabled?: boolean
  // 表单专有字段
  isFormItem?: boolean
  // 图像
  image?: Recordable | boolean
  // tag
  tag?: Recordable | boolean
  // icon 使用的是xhuicloud-ui icon 组件
  icon?: Recordable | boolean
  // 搜索表单
  searchForm?: Partial<FormItem> | boolean
  // 新增/编辑表单
  operationForm?: Partial<FormItem> | boolean
  [key: string]: any
}

export interface PermissionsBtn {
  addBtn?: boolean
  editBtn?: boolean
  delBtn?: boolean
  importBtn?: boolean
  exportBtn?: boolean
  [key: string]: any
}

export const tableProps = {
  /** 开启搜索栏 **/
  enableSearch: {
    type: Object as PropType<FormActionButtonGroupProps>,
    default: { show: false, showSearchButton: false, showResetButton: false, showShowUpButton: false }
  },
  /** 开启行操作栏 **/
  enableOperations: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /** 行操作栏宽度 **/
  operationWidth: {
    type: Number as PropType<number>,
    default: 250
  },
  /** 加载 **/
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  data: {
    type: Object as PropType<[]>,
    default: []
  },
  table: {
    type: Object as PropType<Table>,
    default: {}
  },
  tableColumn: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  onload: {
    type: Function as PropType<(params: any) => any>
  },
  page: {
    type: Object as PropType<Pagination>,
    default: {}
  },
  permission: {
    type: Object as PropType<PermissionsBtn>,
    default: () => {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        importBtn: false,
        exportBtn: false
      }
    }
  }
} as const

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  'update:page': (page: Pagination) => !isNullOrUnDef(page),
  toUpdateRow: (formModel: Recordable<any>) => isObject(formModel),
  toSaveRow: (formModel: Recordable<any>) => isObject(formModel),
  toDelRow: (formModel: Recordable<any>) => isObject(formModel),
  openBefore: (formModel: Recordable<any> | undefined) => isObject(formModel) || isNullOrUnDef(formModel),
  closeBefore: (formModel: Recordable<any> | undefined) => isObject(formModel) || isNullOrUnDef(formModel)
}

export type TableEmits = typeof tableEmits

export type TableEmitsFn = EmitFn<TableEmits>

export default tableProps

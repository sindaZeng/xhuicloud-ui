import { ExtractPropTypes, PropType } from 'vue'
import { PaginationType } from './pagination'

export interface Table<T = any> {
  data?: T[]
  [key: string]: any
}

export interface TableColumn {
  label: string
  prop: string
  hidden?: boolean
  // 图像
  image?: Recordable | boolean
  // tag
  tag?: Recordable | boolean
  // icon 使用的是xhuicloud-ui icon 组件
  icon?: Recordable | boolean
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

const tableProps = {
  enableSearch: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  table: {
    type: Object as PropType<Table<any>>,
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
    type: Object as PropType<PaginationType>
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
}

export const tableEmits = {
  'update:page': (page: PaginationType) => !Object.is(page, false)
}

export type TableEmits = typeof tableEmits

export type TableEmitsFn = EmitFn<TableEmits>

export type TableProps = ExtractPropTypes<typeof tableProps>

export default tableProps

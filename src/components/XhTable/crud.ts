import _default, { TableProps as elTableProps } from 'element-plus/es/components/table/src/table/defaults'
import { ExtractPropTypes, PropType } from 'vue'
import { Page } from './pagination'

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
export const tableProps = {
  // 是否开启搜索
  enableSearch: {
    type: Boolean,
    default: false
  },
  // 是否显示loading
  loading: {
    type: Boolean,
    default: false
  },
  table: {
    type: Object as PropType<elTableProps<any>>
  },
  // 行属性
  tableColumn: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  // 加载方法
  onload: {
    type: Function as PropType<(params: any) => any>
  },
  // 分页
  page: {
    type: Object as PropType<PageRecord>
  }
} as const

export type PageRecord = false | Page

export type TableProps = ExtractPropTypes<typeof tableProps>

import { ExtractPropTypes, PropType } from 'vue'

export interface Table<T = any> {
  enableSearch?: boolean
  loading?: boolean
  data?: T[] | null
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

const tableProps = {
  table: {
    type: Object as PropType<Table<any>>,
    required: true
  },
  tableColumn: {
    type: Array as PropType<TableColumn[]>,
    required: true
  },
  onload: {
    type: Function as PropType<() => any>
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export default tableProps

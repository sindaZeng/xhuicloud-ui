import { ExtractPropTypes, PropType } from 'vue'

export interface Table<T = any> {
  enableSearch?: boolean
  data?: T[] | null
  [key: string]: any
}

export interface TableColumn {
  label: string
  prop: string
  hidden?: boolean
  // 图像
  image?: Recordable
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
    type: Function as PropType<() => Promise<any>>
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export default tableProps

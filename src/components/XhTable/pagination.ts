import { ExtractPropTypes, PropType } from 'vue'

const paginationProps = {
  current: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 1
  },
  layout: {
    type: String
  },
  background: {
    type: Boolean as PropType<boolean>
  },
  pageSizes: {
    type: Array as PropType<number[]>
  },
  handleSizeChange: {
    type: Function as PropType<(val: number) => void>
  },
  handleCurrentChange: {
    type: Function as PropType<(val: number) => void>
  }
}
export type Pagination = ExtractPropTypes<typeof paginationProps>

export type PaginationType = false | Pagination

export default paginationProps

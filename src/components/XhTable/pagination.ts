import { ExtractPropTypes, PropType } from 'vue'

const paginationProps = {
  current: {
    type: Number as PropType<number>,
    default: 1
  },
  size: {
    type: Number as PropType<number>,
    default: 10
  },
  total: {
    type: Number as PropType<number>,
    default: 0
  },
  layout: {
    type: String as PropType<string>
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
export type Pagination = Partial<ExtractPropTypes<typeof paginationProps>>

export default paginationProps

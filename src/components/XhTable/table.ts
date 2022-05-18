import type { PropType } from 'vue'

export const tableProps = {
  tableLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tableData: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    }
  },
  tableAttributes: {
    type: Object,
    required: true
  }
}

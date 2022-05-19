import type { ExtractPropTypes, PropType } from 'vue'
import { TableAttributes } from './types/table'
import XhTable from './index.vue'

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
    type: Object as PropType<TableAttributes>,
    required: true
  }
}

export type XhTableInstance = InstanceType<typeof XhTable>

export type TableProps = ExtractPropTypes<typeof tableProps>

export const emitOptions = ['uploadSuccess', 'beforeUpload', 'getTableData', 'toDelRow', 'toSaveRow', 'toUpdateRow', 'openBefore', 'closeBefore', 'update:page', 'update:formData']

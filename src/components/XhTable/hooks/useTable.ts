import { isNullOrUnDef } from '@/utils/is'
import { computed, ref, watchEffect } from 'vue'
import { TableProps } from '../default'

export type TableState = ReturnType<typeof useTableState>

export const useTableState = (props: TableProps) => {
  const tableData = ref<any>([])
  const table = computed(() => props.table)
  const tableColumn = computed(() => props.tableColumn)

  watchEffect(() => {
    if (!isNullOrUnDef(table.value?.data)) {
      tableData.value = table.value?.data
    }
  })

  return {
    table,
    tableData,
    tableColumn
  }
}

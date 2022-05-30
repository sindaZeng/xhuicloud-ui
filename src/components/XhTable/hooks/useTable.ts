import { isNullOrUnDef } from '@/utils/is'
import { computed, ref, watchEffect } from 'vue'
import { TableProps } from '../crud'
import { PaginationType } from '../pagination'

export type TableState = ReturnType<typeof useTableState>

export const useTableState = (props: TableProps) => {
  const tableData = ref<any[]>([])
  const table = computed(() => props.table)
  const tableColumn = computed(() => props.tableColumn)
  const paginationRef = ref<PaginationType>(false)

  if (!isNullOrUnDef(props.page) && !Object.is(props.page, false)) {
    // 开启分页
    paginationRef.value = {
      current: 1,
      size: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      ...props.page
    }
  }
  watchEffect(() => {
    if (!isNullOrUnDef(table.value.data)) {
      tableData.value = table.value.data
    }
  })

  return {
    table,
    tableData,
    tableColumn,
    paginationRef
  }
}

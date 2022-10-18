import { isNullOrUnDef, isEmptyObject } from '@/utils/is'
import { computed, ref, unref, watchEffect } from 'vue'
import { TableProps } from '../crud'
import { Pagination } from '../pagination'

export type TableState = ReturnType<typeof useTableState>
/**
 * 表格状态
 *
 * @param props
 * @returns
 */
export const useTableState = (props: TableProps) => {
  const tableData = ref<any[]>([])
  const paginationRef = ref<Pagination>(props.page)
  const tableDrawer = ref(false)
  const innerPropsRef = ref<Partial<TableProps>>()
  const dialogVisible = ref<boolean>(false)
  const dialogTitle = ref<string>('create')

  watchEffect(() => {
    // 传入了data
    if (!isNullOrUnDef(props.data)) {
      tableData.value = props.data
    }
    // 开启分页
    if (!isNullOrUnDef(props.page) && !isEmptyObject(unref(paginationRef))) {
      paginationRef.value = {
        total: tableData.value.length,
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes,  prev, pager, next, jumper',
        background: true,
        ...props.page
      }
    }
  })

  /**
   * 维护一个可修改的props
   */
  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) }
  })

  return {
    getProps,
    tableData,
    tableDrawer,
    paginationRef,
    // 是否分页
    enablePagination: !isNullOrUnDef(paginationRef.value.pageSizes),
    innerPropsRef,
    dialogVisible,
    dialogTitle
  }
}

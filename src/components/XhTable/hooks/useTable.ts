import { isNullOrUnDef } from '@/utils/is'
import { computed, ref, unref, watchEffect } from 'vue'
import { TableProps } from '../crud'
import { PaginationType } from '../pagination'

export type TableState = ReturnType<typeof useTableState>

export const useTableState = (props: TableProps) => {
  const tableData = ref<any[]>([])
  const paginationRef = ref<PaginationType>(false)
  const tableDrawer = ref(false)
  const innerPropsRef = ref<Partial<TableProps>>()
  if (!isNullOrUnDef(props.page) && !Object.is(props.page, false)) {
    // 开启分页
    paginationRef.value = {
      current: 1,
      size: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      layout: 'total, sizes,  prev, pager, next, jumper',
      background: true,
      ...props.page
    }
  }
  watchEffect(() => {
    if (!isNullOrUnDef(props.table.data)) {
      tableData.value = props.table.data
    }
  })

  const setProps = (props: Partial<TableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props }
  }

  /**
   * 维护一个可修改的props
   */
  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) }
  })

  return {
    setProps,
    getProps,
    tableData,
    paginationRef,
    tableDrawer
  }
}

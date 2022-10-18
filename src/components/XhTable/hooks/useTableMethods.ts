import { unref } from 'vue'
import { TableEmitsFn, TableProps } from '../crud'
import { Pagination } from '../pagination'
import { TableForm } from './useTableForm'
import { TableState } from './useTableState'

export type UseTableMethods = {
  state: TableState
  props: TableProps
  emit: TableEmitsFn
  tableForm: TableForm
}

export const useTableMethods = ({ state, props, emit, tableForm }: UseTableMethods) => {
  const { tableData, paginationRef, enablePagination, tableDrawer, innerPropsRef, dialogVisible, dialogTitle } = state
  const { setModel } = tableForm

  /**
   * 设置 TableProps
   * @param props
   */
  const setProps = (props: Partial<TableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props }
  }

  /**
   * 打开表单
   * @param title 表单状态/表单title
   * @param obj 表单对象
   */
  const openDialog = (title: string, obj: any) => {
    emit('openBefore', obj)
    dialogTitle.value = title
    dialogVisible.value = true
  }

  /**
   * 关闭表单
   */
  const closeDialog = () => {
    emit('closeBefore')
    dialogVisible.value = false
    setModel({})
  }

  /**
   * 加载表格
   */
  const onload = async (params = {}) => {
    // 搜索参数
    const queryParams = {
      ...params
    }

    // 分页参数
    const _pagination: Pagination = unref(paginationRef)

    if (enablePagination) {
      Object.assign(queryParams, {
        current: _pagination.current,
        size: _pagination.size,
        ...queryParams
      })
    }
    // 表单数据
    const data = await props?.onload?.(queryParams)

    if (data?.pages) {
      const { records, total, size, current } = data
      tableData.value = records
      paginationRef.value = {
        current: ~~current,
        size: ~~size,
        total: ~~total
      }
    } else if (Array.isArray(data)) {
      /** 自动切割 **/
      tableData.value = data
      if (enablePagination) {
        tableData.value = tableData.value.slice(
          (_pagination.current! - 1) * _pagination.size!,
          _pagination.current! * _pagination.size!
        )
        paginationRef.value = {
          ..._pagination,
          total: ~~data.length
        }
      }
    } else {
      tableData.value = []
    }
    return tableData
  }

  /**
   * 改变每页大小
   * @param size
   */
  const handleSizeChange = async (size: number) => {
    Object.assign(unref(paginationRef), { size: size })
    onChange()
  }

  /**
   * 改变当前页码
   * @param current
   */
  const handleCurrentChange = async (current: number) => {
    Object.assign(unref(paginationRef), { current: current })
    onChange()
  }

  /**
   * 公共分页属性改变emit通知
   */
  const onChange = async () => {
    emit('update:page', unref(paginationRef))
    onload()
  }

  /**
   * 打开关闭 表格属性操作栏
   */
  const changeTableDrawer = async () => {
    tableDrawer.value = !tableDrawer.value
  }
  return {
    emit,
    setProps,
    onload,
    onChange,
    openDialog,
    closeDialog,
    handleSizeChange,
    handleCurrentChange,
    changeTableDrawer
  }
}

export type TableMethods = ReturnType<typeof useTableMethods>

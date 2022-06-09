import { isObject } from 'lodash-es'
import { unref } from 'vue'
import { TableEmitsFn, TableProps } from '../crud'
import { TableState } from './useTableState'

export type UseTableMethods = {
  state: TableState
  props: TableProps
  emit: TableEmitsFn
}

export const useTableMethods = ({ state, props, emit }: UseTableMethods) => {
  const { tableData, paginationRef, tableDrawer, innerPropsRef } = state

  const setProps = (props: Partial<TableProps>) => {
    innerPropsRef.value = { ...unref(innerPropsRef), ...props }
  }

  const onload = async (params = {}) => {
    const queryParams = {
      ...params
    }
    const _pagination = unref(paginationRef)
    const enablePagination = isObject(_pagination)
    if (enablePagination) {
      Object.assign(queryParams, {
        current: _pagination.current,
        size: _pagination.size,
        ...queryParams
      })
    }
    const data = await props?.onload?.(queryParams)
    if (data?.pages) {
      const { records, total, size, current } = data
      tableData.value = records
      Object.assign(unref(paginationRef), {
        current: ~~current,
        pageSize: ~~size,
        total: ~~total
      })
    }
    if (Array.isArray(data)) {
      tableData.value = data
      if (enablePagination) {
        tableData.value = tableData.value.slice(
          (_pagination.current - 1) * _pagination.size,
          _pagination.current * _pagination.size
        )
      }
    } else {
      tableData.value = []
    }
    return tableData
  }

  const handleSizeChange = async (size: number) => {
    Object.assign(unref(paginationRef), { size: size })
    onChange()
  }

  const handleCurrentChange = async (current: number) => {
    Object.assign(unref(paginationRef), { current: current })
    onChange()
  }

  const onChange = async () => {
    onload()
    emit('update:page', unref(paginationRef))
  }

  const changeTableDrawer = async () => {
    tableDrawer.value = !tableDrawer.value
  }
  return {
    setProps,
    onload,
    onChange,
    handleSizeChange,
    handleCurrentChange,
    changeTableDrawer
  }
}

export type TableMethods = ReturnType<typeof useTableMethods>

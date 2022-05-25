import { TableProps } from '../default'
import { TableState } from './useTable'

export type UseTableMethods = {
  state: TableState
  props: TableProps
}

export const useTableMethods = ({ state, props }: UseTableMethods) => {
  const { tableData } = state

  const onload = async () => {
    tableData.value = await props?.onload?.()
  }

  return {
    onload
  }
}

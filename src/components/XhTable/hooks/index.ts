import type { TableProps } from '../crud'
import type { TableState } from './useTableState'
import type { TableMethods } from './useTableMethods'

export * from './useTableState'
export * from './useTableContext'
export * from './useTableMethods'
export * from './useTableForm'

export type XhTableType = TableProps & TableState & TableMethods

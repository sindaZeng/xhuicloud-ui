import type { TableProps } from '../crud'
import type { TableState } from './useTable'
import type { TableMethods } from './useTableMethods'

export * from './useTable'
export * from './useTableContext'
export * from './useTableMethods'

export type XhTableType = TableProps & TableState & TableMethods

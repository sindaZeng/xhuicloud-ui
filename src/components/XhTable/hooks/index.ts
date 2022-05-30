import { TableProps } from '../crud'
import { TableState } from './useTable'
import { TableMethods } from './useTableMethods'

export * from './useTable'
export * from './useTableContext'
export * from './useTableMethods'

export type XhTableType = TableState & TableMethods & TableProps

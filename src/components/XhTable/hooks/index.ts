import type { TableProps } from '../crud'
import type { TableState } from './useTableState'
import type { TableMethods } from './useTableMethods'
import type { TableForm } from './useTableForm'
import Crud from '../crud.vue'

export * from './useTableState'
export * from './useTableContext'
export * from './useTableMethods'
export * from './useTableForm'

export type XhTableType = TableProps & TableState & TableMethods & TableForm
export type CrudInstance = InstanceType<typeof Crud>

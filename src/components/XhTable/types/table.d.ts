import { Search } from './search'
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'
import { VNode } from 'vue'

export interface TableAttributes<T = any> {
    enableSearch?: boolean, // 是否开启搜索栏
    enableOperations: boolean, // 是否开启操作栏
    enableBorder?: boolean, // 边框表格
    enableStripe?: boolean, // 斑马纹
    operationWidth?: number, // 操作栏width
    columns: TableColumn<T>[]
}

export interface TableColumn<T = any> {
    label: string,
    prop: string,
    type?: string,
    editDisabled?: boolean, // 更新时禁止修改
    createDisabled?: boolean, // 新增时禁止修改
    search?: Search // 搜索属性
    valueFormat?: (row: T) => string
    formatter?: (
      row: T,
      column: TableColumnCtx<T>,
      cellValue,
      index: number
    ) => VNode | string
}

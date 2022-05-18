import { Search } from './search'

export interface TableAttributes<T = any> {
    enableSearch: boolean, // 是否开启搜索栏
    enableOperations: boolean, // 是否开启操作栏
    operationWidth: number, // 操作栏width
    columns: Column<T>[]
}

export interface Column<T> {
    label: string,
    prop: string,
    editDisabled?: boolean, // 更新时禁止修改
    createDisabled?: boolean, // 新增时禁止修改
    search?: Search // 搜索属性
    valueFormat?: (row: T) => string
    formatter?: (any) => any
}

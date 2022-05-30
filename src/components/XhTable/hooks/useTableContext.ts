import { provide, inject } from 'vue'
import { XhTableType } from '.'

const key = Symbol('xh-table')

export function createTableContext(instance: XhTableType) {
  provide(key, instance)
}

export function useTableContext() {
  return inject(key) as XhTableType
}

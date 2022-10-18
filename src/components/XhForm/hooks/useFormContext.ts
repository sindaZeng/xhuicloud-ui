import { provide, inject } from 'vue'
import type { FormType } from '.'

const key = Symbol('xh-form')

export function createFormContext(instance: FormType) {
  provide(key, instance)
}

export function useFormContext() {
  return inject(key) as FormType
}

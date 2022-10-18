import type { UseFormState } from './useFormState'
import type { UseFormMethods } from './useFormMethods'
import type { UseFormItem } from './useFormItem'
import type { FormProps } from '../form'
import XhForm from '../index.vue'

export * from './useFormState'
export * from './useFormItem'
export * from './useFormMethods'

export type FormType = FormProps & UseFormState & UseFormMethods & UseFormItem
export type XhFormInstance = InstanceType<typeof XhForm>

import { ColProps, FormItemProps as ElFormItemProps, ElInput, ElSelect, InputProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export const componentMap = {
  ElInput,
  ElSelect
}

export type ComponentPropsMap = InputProps & { [key: string]: any }

export type ComponentType = keyof typeof componentMap

export interface FormItem extends ElFormItemProps {
  component?: ComponentType
  componentProps?: ComponentPropsMap
  col?: ColProps
  prop: string
}

export const formItemProps = {
  formModel: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  schemas: { type: Object as PropType<FormItem>, default: () => ({}) }
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

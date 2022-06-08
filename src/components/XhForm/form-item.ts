import { ColProps, FormItemProps as ElFormItemProps, ElInput, ElSelect, InputProps } from 'element-plus'

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

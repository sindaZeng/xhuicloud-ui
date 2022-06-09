import { ColProps, FormItemProps as ElFormItemProps, ElInput, ElSelect, InputProps } from 'element-plus'

export const componentMap = {
  ElInput,
  ElSelect
}

export type ComponentPropsMap = InputProps & { [key: string]: any }

export type ComponentType = keyof typeof componentMap

export interface FormItem extends ElFormItemProps {
  /** 表单组件 **/
  component?: ComponentType
  /** 表单组件属性 **/
  componentProps?: ComponentPropsMap
  /** 表单组件插槽 **/
  componentSlots?: any
  col?: ColProps
  prop: string
}

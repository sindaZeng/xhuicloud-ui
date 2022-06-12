import { ColProps, FormItemProps as ElFormItemProps, ElInput, ElSelect, ElOption, ElOptionGroup } from 'element-plus'

export const componentMap = {
  ElInput,
  ElSelect,
  ElOption,
  ElOptionGroup
}

export type ComponentType = keyof typeof componentMap

export interface FormItem extends ElFormItemProps {
  /** 组件类型 **/
  component?: ComponentType
  componentProps?: any
  col?: ColProps
  prop: string
}

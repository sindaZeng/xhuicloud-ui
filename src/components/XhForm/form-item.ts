import { ColProps, FormItemProps as ElFormItemProps, ElInput, ElSelect, ElOption, ElOptionGroup } from 'element-plus'
import { InputProps, OptionProps, SelectProps } from './form-item-props'

export const componentMap = {
  ElInput,
  ElSelect,
  ElOption,
  ElOptionGroup
}

export type ComponentPropsMap = {
  ElInput: InputProps
  ElSelect: SelectProps
  ElOption: OptionProps
  ElOptionGroup: OptionProps
}

export type ComponentSlotsMap = {
  ElInput: ['prefix', 'suffix', 'prepend', 'append']
  ElSelect: [typeof ElOption, typeof ElOptionGroup]
  ElOption: 'default'
  ElOptionGroup: 'default'
}

export type ComponentType = keyof typeof componentMap

export interface FormItem extends ElFormItemProps {
  /** 组件类型 **/
  component?: ComponentType
  /** 组件参数 **/
  componentProps?: ComponentPropsMap[ComponentType]
  /** 组件插槽 **/
  componentSlots?: ComponentSlotsMap[ComponentType]
  col?: ColProps
  prop: string
}

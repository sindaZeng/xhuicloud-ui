import { ColProps, FormItemProps, ElInput, ElSelectV2, ElOption, ElOptionGroup, ElDatePicker } from 'element-plus'
import { Component, VNode } from 'vue'
import { DatePickViewProps } from './src/datePicker/datePickerProps'
import { InputViewProps } from './src/input/inputProps'
import { SelectViewProps } from './src/select/selectProps'

export interface RenderParams {
  /** 作用域插槽数据 */
  slotData?: Recordable
}

export type CustomRender = (renderParams: RenderParams) => string | VNode | VNode[]

export const componentMap = {
  ElInput,
  ElSelectV2,
  ElSelect: ElSelectV2,
  ElOption,
  ElOptionGroup,
  ElDatePicker
}

export type ComponentType = keyof typeof componentMap

export type ComponentPropsType = InputViewProps | SelectViewProps | DatePickViewProps

export type ComponentSlotsType =
  | ComponentType
  | CustomRender
  | Recordable<CustomRender>
  | ReturnType<CustomRender>
  | ((opt: CustomRender) => Component)
  | ((renderParams: RenderParams) => Recordable<CustomRender>)

export interface FormItem extends FormItemProps {
  /** 组件类型 **/
  component?: ComponentType | CustomRender | ((opt: CustomRender) => Component)
  componentProps?: ComponentPropsType
  componentSlots?:
    | ((renderParams: RenderParams) => Recordable<CustomRender>)
    | Recordable<CustomRender>
    | ReturnType<CustomRender>
  col?: ColProps
  prop: string
}

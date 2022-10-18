import {
  ColProps,
  FormItemProps,
  ElInput,
  ElInputNumber,
  ElSelectV2,
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElDatePicker,
  RadioProps,
  ElCascader,
  ElUpload,
  UploadProps
} from 'element-plus'
import { Component, VNode } from 'vue'
import { DatePickViewProps } from './src/datePicker/datePickerProps'
import { InputViewProps } from './src/input/inputProps'
import { SelectViewProps } from './src/select/selectProps'
import { CustomCascaderProps } from './src/cascader'
import { InputNumberProps } from './src/input/inputNumberProps'
import RadioButtonGroup from './src/radioGroup/RadioButtonGroup.vue'
import ImgUpload from './src/upload/imgUpload/index.vue'

export type GetFieldKeys<T> = Exclude<keyof T, symbol | number>

export interface RenderParams<T = string> {
  /** 作用域插槽数据 */
  slotData?: Recordable
  formModel: T extends string ? Recordable : Record<GetFieldKeys<T>, any>
  field: T extends string ? string : GetFieldKeys<T>
}

export type CustomRender = (renderParams: RenderParams) => string | VNode | VNode[]

export const componentMap = {
  ElInput,
  ElInputNumber,
  ElSelectV2,
  ElSelect: ElSelectV2,
  ElOption,
  ElOptionGroup,
  ElDatePicker,
  ElRadio,
  RadioButtonGroup,
  ElCascader,
  ElUpload,
  ImgUpload
}

export type ComponentType = keyof typeof componentMap

export type ComponentPropsType =
  | InputViewProps
  | SelectViewProps
  | DatePickViewProps
  | RadioProps
  | CustomCascaderProps
  | UploadProps
  | InputNumberProps

export type ComponentSlotsType =
  | ComponentType
  | CustomRender
  | Recordable<CustomRender>
  | ReturnType<CustomRender>
  | ((renderParams: RenderParams) => Component)
  | ((renderParams: RenderParams) => Recordable<CustomRender>)

export interface FormItem extends FormItemProps {
  /** 组件类型 **/
  component?: ComponentType | CustomRender | ((renderParams: RenderParams) => Component)
  /** 组件数据 **/
  componentProps?: Partial<ComponentPropsType>
  /** 组件插槽 **/
  componentSlots?:
    | ((renderParams: RenderParams) => Recordable<CustomRender>)
    | Recordable<CustomRender>
    | ReturnType<CustomRender>
  /** 表单项layout布局 **/
  col?: Partial<ColProps>
  /** 表单项prop **/
  prop: string
  /** 展示/折叠 **/
  show?: boolean
}

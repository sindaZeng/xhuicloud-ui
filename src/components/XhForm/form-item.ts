import { ColProps, FormItemProps, ElInput, ElSelect } from 'element-plus'
import { Component, VNode } from 'vue'
import { InputViewProps } from './src/input/inputProps'

export interface RenderParams {
  /** 作用域插槽数据 */
  slotData?: Recordable
}

export type CustomRender = (renderParams: RenderParams) => string | VNode | VNode[]

export const componentMap = {
  ElInput,
  ElSelect
}

export type ComponentType = keyof typeof componentMap

export type ComponentPropsType = InputViewProps

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

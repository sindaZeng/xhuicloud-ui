import { ComponentSize } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'
import { OptionsItem } from '../radioGroup'

export type OptionCommon = {
  label: string
}

export type Option<T = any> = OptionCommon & {
  value: T
  [prop: string]: any
}

export type OptionGroup<T = any> = OptionCommon & {
  options: Array<T>
  [prop: string]: any
}

export type OptionType<T = any> = Option<T> | OptionGroup<T>

/** 选择框 **/
export const selectViewProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<ComponentSize>
  },
  options: {
    type: Array as PropType<OptionsItem[]>,
    required: true
  }
}

export type SelectViewProps = Partial<ExtractPropTypes<typeof selectViewProps>>
/** 选择框 **/

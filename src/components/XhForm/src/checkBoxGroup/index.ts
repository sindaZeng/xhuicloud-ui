import { useSizeProp } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export type OptionsItem = { label: string | number; value: string | number; disabled?: boolean; name: string }

export const checkboxProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: () => undefined
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: undefined
  },
  trueLabel: {
    type: [String, Number],
    default: undefined
  },
  falseLabel: {
    type: [String, Number],
    default: undefined
  },
  id: {
    type: String,
    default: undefined
  },
  controls: {
    type: String,
    default: undefined
  },
  border: Boolean,
  size: useSizeProp,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: true
  }
}

const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
  },
  disabled: Boolean,
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  size: useSizeProp,
  id: {
    type: String,
    default: undefined
  },
  label: {
    type: String,
    default: undefined
  },
  fill: {
    type: String,
    default: undefined
  },
  textColor: {
    type: String,
    default: undefined
  },
  tag: {
    type: String,
    default: 'div'
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  checkbox: {
    type: Object as PropType<CheckboxProps>,
    default: {}
  },
  options: {
    type: Array as PropType<OptionsItem[]>,
    default: () => []
  }
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export default checkboxGroupProps

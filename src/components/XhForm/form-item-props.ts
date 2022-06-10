import { ArrowUp, CircleClose } from '@element-plus/icons-vue/dist/types'
import { ComponentSize, tagProps, useTooltipContentProps, InputProps as ElInputProps } from 'element-plus'
import { isValidComponentSize } from 'element-plus/es/utils'
import { Component, ExtractPropTypes, PropType } from 'vue'

export const optionProps = {
  value: {
    required: true,
    type: [String, Number, Boolean, Object]
  },
  label: [String, Number],
  disabled: {
    type: Boolean,
    default: false
  }
}

export const selectProps = {
  name: String,
  id: String,
  autocomplete: {
    type: String,
    default: 'off'
  },
  automaticDropdown: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  effect: {
    type: String as PropType<'light' | 'dark' | string>,
    default: 'light'
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  allowCreate: Boolean,
  loading: Boolean,
  popperClass: {
    type: String,
    default: ''
  },
  remote: Boolean,
  loadingText: String,
  noMatchText: String,
  noDataText: String,
  remoteMethod: Function,
  filterMethod: Function,
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String
  },
  defaultFirstOption: Boolean,
  reserveKeyword: {
    type: Boolean,
    default: true
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  collapseTags: Boolean,
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  },
  teleported: useTooltipContentProps.teleported,
  persistent: {
    type: Boolean,
    default: true
  },
  clearIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: CircleClose
  },
  fitInputWidth: {
    type: Boolean,
    default: false
  },
  suffixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ArrowUp
  },
  tagType: { ...tagProps.type, default: 'info' },
  ElOption: {
    type: Array as PropType<OptionProps[]>
  }
} as const

export type SelectProps = Partial<ExtractPropTypes<typeof selectProps>>

export type OptionProps = Partial<ExtractPropTypes<typeof optionProps>>

export declare type InputProps = Partial<ElInputProps>

import { ExtractPropTypes, PropType } from 'vue'

/** 输入框 **/
export const inputViewProps = {
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  autosize: {
    type: Boolean as PropType<boolean>
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showPassword: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  suffixIcon: {
    type: String as PropType<string>,
    default: ''
  },
  prefixIcon: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  type: {
    type: String as PropType<'textarea'>,
    default: ''
  },
  rows: {
    type: Number as PropType<number>
  },
  maxlength: {
    type: Number as PropType<number>
  },
  minlength: {
    type: Number as PropType<number>
  },
  showWordLimit: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  }
}

export type InputViewProps = Partial<ExtractPropTypes<typeof inputViewProps>>
/** 输入框 **/

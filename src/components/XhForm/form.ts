import { componentSizes, FormProps as ElFormProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'
import { FormItem } from './form-item'

export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<ElFormProps['rules']>
  },
  labelPosition: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    values: componentSizes
  },
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  scrollToError: Boolean,
  schemas: {
    type: [Array] as PropType<FormItem[]>,
    default: () => []
  }
}

export type FormProps = Partial<
  ExtractPropTypes<typeof formProps> & {
    schemas: FormItem[]
  }
>
export default FormProps

import { componentSizes, FormItemProps, FormRules } from 'element-plus'
import { definePropType } from 'element-plus/lib/utils'
import { ExtractPropTypes, PropType } from 'vue'

export interface FormItem extends FormItemProps {
  placeholder?: string
}

export const formProps = {
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object)
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

export type FormProps = ExtractPropTypes<typeof formProps>

export default FormProps

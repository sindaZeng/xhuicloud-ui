import { isObject } from '@/utils/is'
import { componentSizes, FormProps as ElFormProps, RowProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'
import { FormActionButtonGroupProps } from './form-action'
import { FormItem } from './form-item'

export const formProps = {
  // 表单数据对象
  model: Object,
  // 表单验证规则
  rules: {
    type: Object as PropType<ElFormProps['rules']>
  },
  // 表单自定义class
  formClassName: String,
  // 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
  labelPosition: String,
  // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto
  labelWidth: {
    type: [String, Number],
    default: 'auto'
  },
  // 行内表单模式
  inline: Boolean,
  // 是否以行内形式展示校验信息
  inlineMessage: Boolean,
  // 是否在输入框中显示校验结果反馈图标
  statusIcon: Boolean,
  // 	是否显示校验错误信息
  showMessage: {
    type: Boolean,
    default: true
  },
  // 用于控制该表单内组件的尺寸 'large' | 'default' | 'small'
  size: {
    type: String,
    values: componentSizes
  },
  // 否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性。
  disabled: Boolean,
  // 是否在 rules 属性改变后立即触发一次验证
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  // 是否显示必填字段的标签旁边的红色星号
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  // 表单项配置规则
  schemas: {
    type: Array as PropType<FormItem[]>,
    default: () => []
  },
  // 表单row配置
  row: {
    type: Object as PropType<Partial<RowProps>>,
    default: () => ({})
  },
  // 是否展示表单按钮组
  formActionButtonGroup: {
    type: Object as PropType<FormActionButtonGroupProps>,
    default: () => ({})
  }
}

export const formEmits = {
  'update:model': (formModel: Recordable<any>) => isObject(formModel),
  search: (formModel: Recordable<any>) => isObject(formModel)
}

export type FormEmits = typeof formEmits

export type FormEmitsFn = EmitFn<FormEmits>

export type FormProps = Partial<
  ExtractPropTypes<typeof formProps> & {
    schemas: FormItem[]
  }
>
export default FormProps

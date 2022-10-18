import { useSizeProp } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export type OptionsItem = { label: string | number; value: string | number; disabled?: boolean; name: string }
const radioButtonGroupProps = {
  id: {
    type: String,
    default: undefined
  },
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  fill: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: undefined
  },
  textColor: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: undefined
  },
  options: {
    type: Array as PropType<OptionsItem[]>,
    default: () => []
  }
}
export type RadioProps = ExtractPropTypes<typeof radioButtonGroupProps>
export default radioButtonGroupProps

import { timePickerDefaultProps } from 'element-plus'
import { ExtractPropTypes } from 'vue'

/** 输入框 **/
export const datePickViewProps = {
  ...timePickerDefaultProps
}
export type DatePickViewProps = Partial<ExtractPropTypes<typeof datePickViewProps>>

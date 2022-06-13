import { ExtractPropTypes, PropType } from 'vue'

/** 选择框 **/
export const selectViewProps = {
  modelValue: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
}

export type SelectViewProps = Partial<ExtractPropTypes<typeof selectViewProps>>
/** 选择框 **/

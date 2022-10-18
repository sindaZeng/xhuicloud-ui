import { ColProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export const formActionButtonGroupProps = {
  col: {
    type: Object as PropType<ColProps>
  },
  show: {
    type: Boolean as PropType<boolean>
  },
  // 搜索按钮
  showSearchButton: {
    type: Boolean as PropType<boolean>
  },
  // 收起展开按钮
  showShowUpButton: {
    type: Boolean as PropType<boolean>
  },
  // 重置按钮属性
  showResetButton: {
    type: Boolean as PropType<boolean>
  }
}

export type FormActionButtonGroupProps = ExtractPropTypes<typeof formActionButtonGroupProps>

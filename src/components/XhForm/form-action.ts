import { ColProps } from 'element-plus'
import { ExtractPropTypes, PropType } from 'vue'

export interface ActionButtonOption {
  // 按钮自定义函数
  btFunc: () => Promise<void>
}
export const formActionButtonGroupProps = {
  col: {
    type: Object as PropType<ColProps>
  },
  // 收起展开按钮属性
  showUpButton: {
    type: Object as PropType<ActionButtonOption | boolean>
  },
  // 重置按钮属性
  resetButton: {
    type: Object as PropType<ActionButtonOption | boolean>
  }
}

export type FormActionButtonGroupProps = ExtractPropTypes<typeof formActionButtonGroupProps>

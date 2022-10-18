import {
  CascaderNode,
  CascaderOption,
  CascaderProps,
  CascaderValue,
  ComponentSize,
  tagProps,
  useTooltipContentProps
} from 'element-plus'
import { isValidComponentSize } from 'element-plus/es/utils'
import { ExtractPropTypes, PropType } from 'vue'

export const CommonProps = {
  modelValue: [Number, String, Array] as PropType<CascaderValue>,
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [] as CascaderOption[]
  },
  props: {
    type: Object as PropType<CascaderProps>,
    default: () => ({} as CascaderProps)
  }
}

export const cascaderProps = {
  ...CommonProps,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  placeholder: {
    type: String
  },
  disabled: Boolean,
  clearable: Boolean,
  filterable: Boolean,
  filterMethod: {
    type: Function as PropType<(node: CascaderNode, keyword: string) => boolean>,
    default: (node: CascaderNode, keyword: string) => node.text.includes(keyword)
  },
  separator: {
    type: String,
    default: ' / '
  },
  showAllLevels: {
    type: Boolean,
    default: true
  },
  collapseTags: Boolean,
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  },
  debounce: {
    type: Number,
    default: 300
  },
  beforeFilter: {
    type: Function as PropType<(value: string) => boolean | Promise<any>>,
    default: () => true
  },
  popperClass: {
    type: String,
    default: ''
  },
  teleported: useTooltipContentProps.teleported,
  // eslint-disable-next-line vue/require-prop-types
  tagType: { ...tagProps.type, default: 'info' },
  validateEvent: {
    type: Boolean,
    default: true
  }
}
export type CustomCascaderProps = Partial<ExtractPropTypes<typeof cascaderProps>>

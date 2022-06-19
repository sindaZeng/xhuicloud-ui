// import { ColProps } from 'element-plus'
import { computed } from 'vue'
import FormProps from '../form'

/**
 * 没有设置col属性的情况下自动计算表单项的col属性
 * @param props
 * @returns
 */
export const useFormItemCol = (props: FormProps) => {
  // const realWidthRef = ref(window.innerWidth)
  return computed(() => {
    const schemas = props.schemas
    // schemas?.forEach((x) => (x.col = { ...x.col, xl: 6 }))
    return schemas
  })
}

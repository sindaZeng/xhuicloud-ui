// import { ColProps } from 'element-plus'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { isNullOrUnDef } from '@/utils/is'
// import { isNullOrUnDef } from '@/utils/is'
import { ColProps } from 'element-plus'
import { computed, ref, Ref, unref, watchEffect } from 'vue'
import { FormItem } from '../form-item'
import { UseFormState } from './useFormState'

/**
 * 没有设置col属性的情况下自动计算表单项的col属性
 * @param state
 * @returns
 */
export const useFormItem = (state: UseFormState, xhuiFormDivRef: Ref<HTMLElement | undefined>) => {
  const { innerFormPropsRef } = state
  const { realWidthRef, screenEnum } = useBreakpoint()

  const xhuiFormWidth = ref<number>(realWidthRef.value)

  const itemWidth = ref<string>()

  const col = ref<Partial<ColProps>>({ xl: 6 })

  watchEffect(() => {
    if (!unref(realWidthRef) || isNullOrUnDef(unref(xhuiFormDivRef))) {
      return
    }
    /** 重置为表单组件width **/
    xhuiFormWidth.value = xhuiFormDivRef.value!.scrollWidth
    let factor = 4
    if (unref(xhuiFormWidth) >= screenEnum.XL) {
      // ≥1920px
      col.value = { ...col.value, xl: 6 }
    } else if (unref(xhuiFormWidth) >= screenEnum.LG) {
      // ≥1200px
      factor = 6
      col.value = { ...col.value, lg: 6 }
    } else if (unref(xhuiFormWidth) >= screenEnum.MD) {
      factor = 6
      // ≥992px
      col.value = { ...col.value, md: 6 }
    } else if (unref(xhuiFormWidth) >= screenEnum.SM) {
      col.value = { ...col.value, xl: 12, sm: 8 }
    } else if (unref(xhuiFormWidth) < screenEnum.SM) {
      factor = 3
      col.value = { ...col.value, sm: 12 }
    }
    itemWidth.value = unref(xhuiFormWidth) / factor + 'px'
  })

  /**
   * 表单项属性设置
   */
  const getSchemas = computed(() => {
    const schemas = innerFormPropsRef.value.schemas
    return schemas as FormItem[]
  })

  return {
    col,
    getSchemas,
    itemWidth,
    xhuiFormWidth
  }
}

export type UseFormItem = ReturnType<typeof useFormItem>

import { unref } from 'vue'
import { FormProps, FormEmitsFn } from '../form'
import { UseFormState } from './useFormState'

interface UseFormMethodsContext {
  state: UseFormState
  emit: FormEmitsFn
}
export const useFormMethods = ({ state, emit }: UseFormMethodsContext) => {
  const { innerFormPropsRef, showUpRef, formModelRef } = state

  const setProps = (props: Partial<FormProps>) => {
    innerFormPropsRef.value = { ...unref(innerFormPropsRef), ...props }
  }

  /**
   * 展示 false 收起 true
   * 收起时候展示前三个 小于3个不展示
   * @param showUpRef
   */
  const showOrUp = () => {
    let defaultShowNum = 0
    for (const schema of unref(innerFormPropsRef).schemas!) {
      if (unref(showUpRef) && defaultShowNum++ < 3) {
        continue
      }
      schema.show = unref(showUpRef)
    }
  }

  /**
   * 去重置
   */
  const toReset = () => {
    formModelRef.value = {}
  }

  /**
   * 展开折叠
   */
  const toShowUp = () => {
    showUpRef.value = !showUpRef.value
    showOrUp()
  }

  /**
   * 去搜索
   */
  const toSearch = () => {
    emit('search', formModelRef.value)
  }

  return {
    setProps,
    toSearch,
    toReset,
    toShowUp
  }
}

export type UseFormMethods = ReturnType<typeof useFormMethods>

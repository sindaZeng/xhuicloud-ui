import { cloneDeep } from 'lodash-es'
import { ref, computed } from 'vue'
import FormProps from '../form'

export type UseFormContext = {
  props: FormProps
  attrs: Data
}

export type FormState = ReturnType<typeof useFormState>

export const useFormState = ({ props, attrs }: UseFormContext) => {
  const innerFormPropsRef = ref<FormProps>(cloneDeep(props))

  // 表单数据
  const formModelRef = ref<any>({ ...props.model })

  const getBindValue = computed(() => ({ ...attrs, ...props } as FormProps))

  return {
    getBindValue,
    formModelRef,
    innerFormPropsRef
  }
}

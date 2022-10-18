import { cloneDeep } from 'lodash-es'
import { ref, computed } from 'vue'
import FormProps from '../form'

export type UseFormContext = {
  props: FormProps
  attrs: Data
}

export const useFormState = ({ props, attrs }: UseFormContext) => {
  const innerFormPropsRef = ref<FormProps>(cloneDeep(props))
  // 展示/折叠
  const showUpRef = ref<boolean>(false)

  // 表单数据
  const formModelRef = ref<any>({ ...props.model })

  // 表单原始数据
  const resourceFormModelRef = ref<any>({ ...props.model })

  const getBindValue = computed(() => ({ ...attrs, ...props } as FormProps))

  return {
    showUpRef,
    getBindValue,
    formModelRef,
    innerFormPropsRef,
    resourceFormModelRef
  }
}

export type UseFormState = ReturnType<typeof useFormState>

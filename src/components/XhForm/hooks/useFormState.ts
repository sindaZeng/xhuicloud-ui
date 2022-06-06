import { cloneDeep } from 'lodash-es'
import { ref, unref, computed } from 'vue'
import FormProps from '../form'

export type UseFormContext = {
  props: FormProps
  attrs: Data
}

export type FormState = ReturnType<typeof useFormState>

export const useFormState = ({ props, attrs }: UseFormContext) => {
  const innerPropsRef = ref<Partial<FormProps>>(props)

  const modelRef = ref<any>(cloneDeep(props.model))

  const getProps = computed((): FormProps => {
    return { ...props, ...unref(innerPropsRef) } as FormProps
  })

  const schemasRef = ref<FormProps>(cloneDeep(props))

  const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) } as Recordable))

  return { getProps, getBindValue, schemasRef, modelRef }
}

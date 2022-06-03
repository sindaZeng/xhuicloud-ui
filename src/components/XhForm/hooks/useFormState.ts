import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import FormProps from '../form'

export type UseFormContext = {
  props: FormProps
}

export type FormState = ReturnType<typeof useFormState>

export const useFormState = ({ props }: UseFormContext) => {
  const formPropsRef = ref<FormProps>(cloneDeep(props))
  const modelRef = ref<any>(cloneDeep(props.model))
  const schemasRef = ref<FormProps>(cloneDeep(props))
  return { formPropsRef, schemasRef, modelRef }
}

import FormProps from '../form'

export type UseFormContext = {
  props: FormProps
}

export type FormState = ReturnType<typeof useFormState>

export const useFormState = ({ props }: UseFormContext) => {
  console.log(props)
  return {}
}

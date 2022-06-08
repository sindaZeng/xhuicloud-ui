import { isString } from '@/utils/is'
import { computed } from 'vue'
import { componentMap, FormItemProps } from '../form-item'

export const useFormItemState = (props: FormItemProps) => {
  return {
    getComponent: computed(() => {
      const comp = props.schemas.component
      return isString(comp) ? componentMap[comp] : componentMap['ElInput']
    }),
    getComponentProps: computed(() => {
      const { componentProps = {} } = props.schemas
      return componentProps
    })
  }
}

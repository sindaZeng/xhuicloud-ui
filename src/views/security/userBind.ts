import { ExtractPropTypes, PropType } from 'vue'

export const userBindProps = {
  updateModel: { type: String as PropType<string>, default: '' },
  updateProp: { type: String, default: '' },
  active: { type: Number, default: 1 },
  validate: { type: Function as PropType<(params: string) => boolean | string>, default: () => ({}) }
}

export type UserBindProps = ExtractPropTypes<typeof userBindProps>

import { PaginationProps } from 'element-plus'
import { PropType } from 'vue'

export interface Page extends PaginationProps {
  [key: string]: any
}

export const pageProps = {
  page: {
    type: Object as PropType<Page>,
    required: true
  }
}

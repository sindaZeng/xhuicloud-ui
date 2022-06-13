import { FormProps } from '@/components/XhForm/form'
import { FormItem } from '@/components/XhForm/form-item'
import { computed, Slots, unref } from 'vue'
import { TableColumn } from '../crud'
import { TableState } from './useTableState'

export const useTableForm = (state: TableState, slots: Slots) => {
  const getFormSlotKeys = computed(() => {
    const keys = Object.keys(slots)
    console.log(keys)
    return keys.map((item) => (item.startsWith('form') ? item : null)).filter((item) => !!item) as string[]
  })

  // 开启搜索
  const getTableSearchForm = computed<FormProps>(() => {
    const tableForm: FormProps = {
      model: {},
      schemas: [],
      labelPosition: 'right',
      labelWidth: '210',
      labelSuffix: '',
      inline: true,
      inlineMessage: false,
      statusIcon: false,
      showMessage: false,
      disabled: false,
      validateOnRuleChange: false,
      hideRequiredAsterisk: false,
      scrollToError: false
    }
    if (!unref(state.getProps).enableSearch) {
      return tableForm
    }
    const tableColumns: TableColumn[] = unref(state.getProps).tableColumn
    const tableSearchFormItem: FormItem[] = []
    for (const tableColumn of tableColumns) {
      !tableColumn.search ||
        tableSearchFormItem.push({
          component: 'ElInput',
          col: { sm: 10, xs: 16 },
          ...(tableColumn.search as FormItem),
          label: tableColumn.label,
          prop: tableColumn.prop
        } as FormItem)
    }
    tableForm.schemas = tableSearchFormItem
    return tableForm
  })

  return { getFormSlotKeys, getTableSearchForm }
}

import { FormProps, FormItem } from '@/components/XhForm/form'
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
      schemas: [],
      labelWidth: '50',
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
    const tableSearchsFormItem: FormItem[] = []
    for (const tableColumn of tableColumns) {
      tableSearchsFormItem.push({ label: tableColumn.label, prop: tableColumn.prop } as FormItem)
    }
    tableForm.schemas = tableSearchsFormItem
    return tableForm
  })

  return { getFormSlotKeys, getTableSearchForm }
}

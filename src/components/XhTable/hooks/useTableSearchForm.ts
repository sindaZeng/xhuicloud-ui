import { FormProps } from '@/components/XhForm/form'
import { FormItem } from '@/components/XhForm/form-item'
import { computed, Slots, unref } from 'vue'
import { TableColumn } from '../crud'
import { TableState } from './useTableState'

/**
 * 搜索表单
 *
 * @param state
 * @param slots
 * @returns
 */
export const useTableSearchForm = (state: TableState, slots: Slots) => {
  const getFormSlotKeys = computed(() => {
    const keys = Object.keys(slots)
    return keys.map((item) => (item.startsWith('form') ? item : null)).filter((item) => !!item) as string[]
  })

  // 开启搜索
  const getTableSearchForm = computed<FormProps>(() => {
    // 表单属性
    const tableForm: FormProps = {
      formClassName: 'searchFormClass',
      model: {},
      schemas: [],
      labelPosition: 'right',
      labelWidth: '60px',
      inline: true,
      inlineMessage: false,
      statusIcon: false,
      showMessage: false,
      disabled: false,
      validateOnRuleChange: false,
      hideRequiredAsterisk: false
    }
    if (!unref(state.getProps).enableSearch) {
      return tableForm
    }
    const tableColumns: TableColumn[] = unref(state.getProps).tableColumn
    const tableSearchFormItem: FormItem[] = []
    // 表单项属性
    for (const tableColumn of tableColumns) {
      !tableColumn.search ||
        tableSearchFormItem.push({
          component: 'ElInput',
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
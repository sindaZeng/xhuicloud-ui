import { FormProps } from '@/components/XhForm/form'
import { FormItem } from '@/components/XhForm/form-item'
import { ColProps } from 'element-plus'
import { computed, ComputedRef, ref, Slots, unref } from 'vue'
import { TableColumn } from '../crud'
import { TableState } from './useTableState'

/**
 * 搜索表单
 *
 * @param state
 * @param slots
 * @returns
 */
export const useTableForm = (state: TableState, slots: Slots) => {
  const { dialogTitle } = state

  const model = ref<any>()

  /**
   * 设置表单数据对象
   * @param obj 表单数据对象
   */
  const setModel = (obj: any) => {
    model.value = obj
  }
  /**
   * 获取默认表单属性
   * @returns
   */
  const getDefaultTableForm = () => {
    return {
      formClassName: 'searchFormClass',
      schemas: [],
      size: 'default',
      labelPosition: 'right',
      inline: true,
      inlineMessage: false,
      statusIcon: false,
      showMessage: true,
      disabled: false,
      validateOnRuleChange: false,
      hideRequiredAsterisk: false
    } as FormProps
  }

  /**
   * 获取表单插槽
   */
  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots)
    const slotKeys = keys.map((item) => (item.endsWith('Form') ? item : null)).filter((item) => !!item) as string[]
    return slotKeys
  })

  /**
   * 获取行操作插槽
   */
  const getRowOperationSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots)
    const slotKeys = keys.map((item) => (item.endsWith('Operation') ? item : null)).filter((item) => !!item) as string[]
    return slotKeys
  })

  /**
   * 表格列转表单项
   * @param state 表格状态
   * @param isSearchForm 是否为搜索表单 true是搜索表单 false为操作表单
   * @returns
   */
  const getFormItems = (state: TableState, isSearchForm: boolean) => {
    const tableColumns: TableColumn[] = unref(state.getProps).tableColumn
    const tableOperationFormItem: FormItem[] = []

    const col = ref<Partial<ColProps>>({ xl: 12, lg: 12 })

    // 表格列转为表单项属性
    for (const tableColumn of tableColumns) {
      const formItem = {
        component: 'ElInput',
        col: !isSearchForm ? col : null,
        ...(!isSearchForm ? (tableColumn.operationForm as FormItem) : (tableColumn.searchForm as FormItem)),
        label: tableColumn.label,
        prop: tableColumn.prop
      } as FormItem

      if (!isSearchForm && tableColumn.operationForm) {
        if (unref(dialogTitle) === 'edit') {
          if (tableColumn.editDisplay) formItem.show = true
          if (tableColumn.editDisabled) formItem.componentProps = { ...formItem.componentProps, disabled: true }
        } else {
          if (tableColumn.createDisplay) formItem.show = true
          if (tableColumn.createDisabled) formItem.componentProps = { ...formItem.componentProps, disabled: true }
        }
        tableOperationFormItem.push(formItem)
      } else if (isSearchForm && tableColumn.searchForm) {
        tableOperationFormItem.push(formItem)
      }

      // ;(isSearchForm && !tableColumn.searchForm) ||
    }
    return tableOperationFormItem
  }

  /**
   * 创建编辑表单
   */
  const getTableOperationForm = computed<FormProps>(() => {
    const tableForm = getDefaultTableForm()
    // 表单属性
    tableForm.schemas = getFormItems(state, false)
    return tableForm
  })

  /**
   * 创建搜索表单
   */
  const getTableSearchForm = computed<FormProps>(() => {
    // 表单属性
    const tableForm = getDefaultTableForm()

    if (!unref(state.getProps).enableSearch) {
      return tableForm
    }

    tableForm.formActionButtonGroup = state.getProps.value.enableSearch
    tableForm.schemas = getFormItems(state, true)
    return tableForm
  })

  return {
    model,
    setModel,
    slots,
    getFormSlotKeys,
    getRowOperationSlotKeys,
    getTableSearchForm,
    getTableOperationForm
  }
}

export type TableForm = ReturnType<typeof useTableForm>

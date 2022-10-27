<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="$t(`table.` + dialogTitle + `Dialog`)"
    width="50%"
    :append-to-body="true"
    :before-close="closeDialog"
  >
    <xh-form v-bind="getTableOperationForm" ref="createOrUpdateFormRef" v-model:model="model">
      <template v-for="item in getFormItemSlotKeys" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </xh-form>
    <template v-for="item in getFormSlotKeys">
      <slot :name="item" />
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="toSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { XhFormInstance } from '../XhForm/hooks'
  import { useTableContext } from './hooks'

  const createOrUpdateFormRef = ref<XhFormInstance>()

  const {
    model,
    dialogVisible,
    dialogTitle,
    closeDialog,
    getTableOperationForm,
    emit,
    getFormItemSlotKeys,
    getFormSlotKeys
  } = useTableContext()

  const toSubmit = () => {
    createOrUpdateFormRef.value?.validate?.((valid) => {
      if (valid) {
        if (dialogTitle.value === 'create') {
          emit('toSaveRow', model.value)
        } else {
          emit('toUpdateRow', model.value)
        }
        closeDialog()
      }
    })
  }
</script>
<style lang="scss" scoped></style>

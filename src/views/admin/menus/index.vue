<template>
  <Crud
    :table="{ rowKey: 'id' }"
    :enable-operations="true"
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="menuData"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @openBefore="openBefore"
    @toUpdateRow="toUpdateRow"
  >
    <!-- 表单插槽 -->
    <template #pathFormItem="{ formModel, field }">
      <el-input v-model="formModel[field]" :disabled="formModel['type'] == 1"></el-input>
    </template>
    <template #permissionFormItem="{ formModel, field }">
      <el-input v-model="formModel[field]" :disabled="formModel['type'] == 0"></el-input>
    </template>
    <template #parentIdFormItem="{ formModel, field }">
      <el-cascader
        v-model="formModel[field]"
        :options="menuOptions"
        :show-all-levels="false"
        :props="{ checkStrictly: true, emitPath: false }"
        clearable
      ></el-cascader>
    </template>
  </Crud>
</template>
<script lang="ts" setup>
  import { createMenu, deleteMenu, menuTree, updateMenu } from '@/api/upms/menu'
  import { checkPermission } from '@/utils'
  import { ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { tableColumn } from '.'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_menu', false),
      editBtn: checkPermission('sys_editor_menu', false),
      delBtn: checkPermission('sys_delete_menu', false)
    }
  })

  const menuData = ref<Menu[]>([])

  const menuOptions = ref<Menu[]>([])
  /**
   * 获取菜单列表
   */
  const onload = async () => {
    const response = await menuTree(false)
    menuData.value = response
    return response
  }

  /**
   * 表单打开前回调
   */
  const openBefore = () => {
    menuTree(true).then((response) => {
      menuOptions.value = response
      menuOptions.value.unshift({ value: 0, label: '根菜单' } as Menu)
    })
  }

  const toDelRow = (formModel: Menu) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.name} ?`).then(() => {
      return deleteMenu(formModel.id).then(() => {
        onload()
      })
    })
  }

  const toSaveRow = (formModel: Menu) => {
    createMenu(formModel).then(() => {
      onload()
    })
  }

  const toUpdateRow = (formModel: Menu) => {
    updateMenu(formModel).then(() => {
      onload()
    })
  }
</script>
<style lang="scss" scoped>
  ::v-deep(.el-table) {
    tr {
      height: 50px;
    }
    .svg-icon {
      width: 30px;
      height: 30px;
    }
  }
</style>

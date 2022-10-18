<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->
<template>
  <Crud
    v-model:page="page"
    :enable-search="search"
    :enable-operations="true"
    :permission="{ addBtn: true, editBtn: true, delBtn: true }"
    :table-column="tableColumn"
    :onload="onload"
    :data="roleData"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  >
    <!-- 行操作插槽 注:必须Operation结尾 -->
    <template #tableOperation="{ data }">
      <el-button size="small" @click="handlePermission(data)">
        <el-icon class="el-icon--left"><xh-svg icon="permission"></xh-svg></el-icon>权限
      </el-button>
    </template>
  </Crud>
  <el-dialog v-model="dialogPermissionVisible" title="角色权限" width="40%" :before-close="toClose">
    <el-tree
      ref="roleMenuTreeRef"
      :data="menuData"
      highlight-current
      show-checkbox
      :height="500"
      node-key="id"
      :check-strictly="true"
      :default-expanded-keys="checkandExpandMenuData"
      :default-checked-keys="checkandExpandMenuData"
    >
      <template #default="{ node }">
        <el-tag v-if="node.data.type === 0" type="success">菜单</el-tag>
        <el-tag v-else>按钮</el-tag>
        <span class="tree-node">{{ node.label }}</span>
      </template>
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toClose">{{ $t(`button.cancel`) }}</el-button>
        <el-button type="primary" @click="toUpdateRoleMenus">{{ $t(`button.confirm`) }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { menuTree, menuTreeByRole } from '@/api/upms/menu'
  import { createRole, deleteRole, rolesPage, updateRole, updateRoleMenus } from '@/api/upms/roles'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox, ElTree } from 'element-plus'
  import { ref } from 'vue'
  import { tableColumn } from '.'

  const roleData = ref<SysRole[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const dialogPermissionVisible = ref<boolean>(false)
  const menuData = ref<Menu[]>([])
  const checkandExpandMenuData = ref<number[]>([])
  const roleId = ref<number>()
  const roleMenuTreeRef = ref<InstanceType<typeof ElTree>>()

  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  /**
   * 获取角色列表
   */
  const onload = async (searchForm?: any) => {
    const response = await rolesPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    roleData.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: SysRole) => {
    updateRole(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: SysRole) => {
    createRole(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysRole) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.roleName} ?`).then(() => {
      return deleteRole(formModel.id).then(() => {
        onload()
      })
    })
  }

  const toClose = () => {
    dialogPermissionVisible.value = false
    menuData.value = []
    checkandExpandMenuData.value = []
    roleId.value = undefined
  }

  const handlePermission = (row: any) => {
    menuTree(false)
      .then((res) => {
        menuData.value = res
        return menuTreeByRole(row.id)
      })
      .then((res) => {
        const menuIds = []
        for (const menuId of res) {
          menuIds.push(menuId)
        }
        checkandExpandMenuData.value = menuIds
        roleId.value = row.id
      })
    dialogPermissionVisible.value = !dialogPermissionVisible.value
  }

  const toUpdateRoleMenus = () => {
    const keys = roleMenuTreeRef.value!.getCheckedKeys()
    updateRoleMenus({ roleId: roleId.value!, menuIds: keys.map(Number) }).then(() => {
      dialogPermissionVisible.value = false
    })
  }
</script>
<style lang="scss" scoped></style>

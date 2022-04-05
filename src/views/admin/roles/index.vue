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
  <xhui-table
    :tableAttributes='tableAttributes'
    :permission='permission'
    v-model:page='page'
    :tableData='tableData'
    @getTableData='getTableData'
    @toDelRow='toDelRow'
    @toSaveRow='toSaveRow'
    @toUpdateRow='toUpdateRow'>
    <template #tableOperation='{ scope }'>
      <el-button
        size="small"
        @click='handlePermission(scope.row)'>
        <el-icon class="el-icon--left"><xhui-svg icon='permission'></xhui-svg></el-icon>权限
      </el-button>
    </template>
  </xhui-table>
  <el-dialog title="角色权限"
             width="40%"
             :before-close="toClose"
             v-model="dialogPermissionVisible">
    <el-tree
      ref='roleMenuTreeRef'
      :data="menuData"
      highlight-current
      show-checkbox
      :height="500"
      node-key='id'
      :check-strictly="true"
      :default-expanded-keys='checkandExpandMenuData'
      :default-checked-keys='checkandExpandMenuData'>
        <template #default="{ node }">
          <el-tag v-if='node.data.type === 0' type='success'>菜单</el-tag>
          <el-tag v-else>按钮</el-tag>
          <span class='tree-node'>{{ node.label }}</span>
      </template>
    </el-tree>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="toClose">{{ $t(`button.cancel`) }}</el-button>
              <el-button
                type="primary"
                @click="toUpdateRoleMenus">{{ $t(`button.confirm`) }}</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { tableAttributes } from '@/api/roles/dto'
import usePage from '@/mixins/page'
import { rolesPage, delRole, updateRole, createRole, updateRoleMenus } from '@/api/roles'
import { ElMessageBox, ElNotification } from 'element-plus'
import { computed, ref } from 'vue'
import { menuTree, getRoleTree } from '@/api/menu'
import { checkData } from '@/utils'
import { useStore } from 'vuex'

const { page } = usePage()

const store = useStore()

const tableData = ref([])

const roleId = ref(null)

const roleMenuTreeRef = ref(null)

const menuData = ref([])

const checkandExpandMenuData = ref([])

const dialogPermissionVisible = ref(false)

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_role, false),
    editBtn: checkData(store.getters.permissions.sys_editor_role, false),
    delBtn: checkData(store.getters.permissions.sys_delete_role, false)
  }
})

const toClose = () => {
  dialogPermissionVisible.value = false
  menuData.value = []
  checkandExpandMenuData.value = []
  roleId.value = null
}

const getTableData = async (searchForm) => {
  const {
    records,
    total
  } = await rolesPage({ ...page.value, ...searchForm })
  page.value.total = total
  tableData.value = records
  return records
}

const handlePermission = row => {
  menuTree({ disabled: false }).then(res => {
    menuData.value = res
    return getRoleTree(row.id)
  }).then(res => {
    const arr = []
    for (const datum of res) {
      arr.push(Number(datum))
    }
    checkandExpandMenuData.value = arr
    roleId.value = row.id
  })
  dialogPermissionVisible.value = !dialogPermissionVisible.value
}

const toUpdateRoleMenus = () => {
  const keys = roleMenuTreeRef.value.getCheckedKeys()
  updateRoleMenus(roleId.value, keys.join(',')).then(data => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    dialogPermissionVisible.value = false
  })
}
const toUpdateRow = row => {
  updateRole(row).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Update success',
      type: 'success'
    })
  })
}

const toSaveRow = data => {
  createRole(data).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    getTableData()
  })
}

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.roleName} ?`)
    .then(() => {
      return delRole(row.id).then(res => {
        ElNotification({
          title: 'Success',
          message: 'Delete success',
          type: 'success'
        })
      })
    }).catch(() => {
    }).then(() => {
      getTableData()
    })
}
</script>

<style lang='scss' scoped>
.tree-node {
  margin-left: 10px;
}
</style>

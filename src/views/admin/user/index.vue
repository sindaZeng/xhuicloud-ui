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
  <xhui-card>
    <el-row :span="24">
      <el-col :xs="24" :sm="24" :md="4">
        <div class='search-container'>
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
          />
        </div>
        <el-tree
          :data="deptTreeData"
          :expand-on-click-node="false"
          :filter-node-method="filterDeptTreeData"
          @node-click="handleNodeClick"
          ref="deptTreeRef"
          default-expand-all
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="20">
        <xhui-table
          ref='userTableRef'
          :cardStyle='false'
          :tableAttributes='tableAttributes'
          :permission='permission'
          v-model:page='page'
          :tableData='tableData'
          @open-before='openBefore'
          @close-before='closeBefore'
          @getTableData='getTableData'
          @toDelRow='toDelRow'
          @toSaveRow='toSaveRow'
          @toUpdateRow='toUpdateRow'>
          <template #deptVosForm>
            <el-cascader
              v-model="currentDeptId"
              :options="deptTreeData"
              :show-all-levels='false'
              :props="{ checkStrictly: true, multiple: true, emitPath: false }"
              clearable
            ></el-cascader>
          </template>
          <template #deptVos='{ data }'>
            <span v-for="(item, index) in data" :key="index">
              <el-tag type='success' size='large'>{{ item.deptName }}</el-tag>
            </span>
          </template>
          <template #roleVosForm>
            <el-select
              v-model="role"
              multiple
              placeholder="请选择角色"
              style="width: 240px"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #roleVos='{ data }'>
            <span v-for="(item, index) in data" :key="index">
              <el-tag type='success' size='large'>{{ item.roleName }}</el-tag>
            </span>
          </template>
        </xhui-table>
      </el-col>
    </el-row>
  </xhui-card>
</template>

<script setup>
import { tableAttributes } from '@/api/user/dto'
import { userPage, createUser, delUser, updateUser } from '@/api/user'
import { deptTree } from '@/api/dept'
import usePage from '@/mixins/page'
import { ElMessageBox, ElNotification } from 'element-plus'
import { computed, ref, watchPostEffect } from 'vue'
import { validatenull } from '@/utils/validate'
import { useStore } from 'vuex'
import { checkData } from '@/utils'
import { rolesList } from '@/api/roles'

const { page } = usePage()

const deptTreeData = ref({})

const deptName = ref('')

const deptTreeRef = ref(null)

const deptIds = ref([])

const roles = ref([])

const role = ref([])

const currentDeptId = ref([])

const tableData = ref([])

const store = useStore()

const permission = computed(() => {
  return {
    addBtn: checkData(store.getters.permissions.sys_add_user, false),
    editBtn: checkData(store.getters.permissions.sys_editor_user, false),
    delBtn: checkData(store.getters.permissions.sys_delete_user, false)
  }
})

// https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#%E4%BE%A6%E5%90%AC%E6%A8%A1%E6%9D%BF%E5%BC%95%E7%94%A8 解决watch 获取不到dom
watchPostEffect(() => {
  if (!validatenull(deptName.value)) {
    deptTreeRef.value.filter(deptName.value)
  }
})

const openBefore = (formData) => {
  getRolesList()
  const roleVos = formData.roleVos
  if (roleVos) {
    roleVos.forEach(item => {
      role.value.push(item.roleId)
    })
  }
  const deptVos = formData.deptVos
  if (deptVos) {
    deptVos.forEach(item => {
      currentDeptId.value.push(item.deptId)
    })
  }
}
const closeBefore = () => {
  roles.value = []
  role.value = []
}

const getRolesList = () => {
  rolesList().then(res => {
    roles.value = res
  })
}

const handleNodeClick = (data) => {
  currentDeptId.value = []
  deptIds.value = []
  currentDeptId.value.push(data.id)
  deptIds.value.push(data.id)
  getDeptNodeChildrenId(deptIds, data.children)
  getTableData(page.value, null)
}

const getDeptNodeChildrenId = (deptIds, node) => {
  for (const dataKey in node) {
    const dept = node[dataKey]
    deptIds.value.push(dept.id)
    if (dept.children !== null) {
      getDeptNodeChildrenId(deptIds, dept.children)
    }
  }
}

const getDeptTree = async () => {
  const data = await deptTree()
  deptTreeData.value = data
}

getDeptTree()

const filterDeptTreeData = (value, data) => {
  if (!value) return true
  return data.name.indexOf(value) !== -1
}

const getTableData = (searchForm) => {
  userPage({ ...page.value, ...searchForm, deptIds: deptIds.value.join(',') }).then(response => {
    page.value.total = response.total
    tableData.value = response.records
  }).catch(() => {
  })
}

const toUpdateRow = row => {
  updateUser({ ...row, roleIds: role.value }).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Update success',
      type: 'success'
    })
  })
  getTableData()
}

const toSaveRow = data => {
  createUser({ ...data, deptIds: currentDeptId.value, roleIds: role.value }).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    getTableData()
  })
}

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.username} ?`)
    .then(() => {
      return delUser(row.userId).then(res => {
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
</style>

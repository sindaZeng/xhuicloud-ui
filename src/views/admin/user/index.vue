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
  <xh-card>
    <el-row :span="24">
      <el-col :xs="24" :sm="24" :md="5">
        <xh-card>
          <el-input v-model="deptName" :placeholder="$t('placeholder.deptName')" clearable size="small" />
          <el-tree
            ref="deptTreeRef"
            :data="deptTreeData"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </xh-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="19">
        <Crud
          ref="userCrudRef"
          v-model:page="page"
          :enable-search="search"
          :enable-operations="true"
          :permission="{ addBtn: true, editBtn: true, delBtn: true }"
          :table-column="tableColumn"
          :onload="onload"
          :data="Roledata"
          @toDelRow="toDelRow"
          @toSaveRow="toSaveRow"
          @toUpdateRow="toUpdateRow"
          @openBefore="openBefore"
          @closeBefore="closeBefore"
        >
          <!-- 表单插槽 -->
          <template #deptIdsForm="{ formModel, field }">
            <el-cascader
              v-model="formModel[field]"
              :options="deptTreeData"
              :show-all-levels="false"
              :props="{ checkStrictly: true, multiple: true, emitPath: false }"
              clearable
            ></el-cascader>
          </template>
          <template #roleIdsForm="{ formModel, field }">
            <el-select v-model="formModel[field]" multiple placeholder="请选择角色" style="width: 240px">
              <el-option v-for="item in roleDtos" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <!-- 字段插槽 -->
          <template #deptVos="{ data }">
            <span v-for="(item, index) in data" :key="index">
              <el-tag type="success" size="large">{{ item.deptName }}</el-tag>
            </span>
          </template>
          <template #roleVos="{ data }">
            <span v-for="(item, index) in data" :key="index">
              <el-tag type="success" size="large">{{ item.roleName }}</el-tag>
            </span>
          </template>
        </Crud>
      </el-col>
    </el-row>
  </xh-card>
</template>
<script lang="ts" setup>
  import { deptTree } from '@/api/upms/dept'
  import { FilterValue, TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
  import { ref, shallowRef, unref, watchPostEffect } from 'vue'
  import { Pagination } from '@/components/XhTable/pagination'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { createUser, deleteUser, updateUser, userPage } from '@/api/upms/user'
  import { tableColumn } from '.'
  import { CrudInstance } from '@/components/XhTable/hooks'
  import { rolesList } from '@/api/upms/roles'
  import { isNullOrUnDef } from '@/utils/is'
  import { ElMessageBox } from 'element-plus'

  /** 组件实例 **/
  const deptTreeRef = ref()
  const userCrudRef = shallowRef<CrudInstance>()

  /** 部门树 **/
  const deptName = ref('')
  // 选中的部门以及其子节点
  const deptIds = ref<number[]>()
  const deptTreeData = ref<Dept[]>()

  /** 用户表 **/
  const page = ref<Pagination>({ current: 1, size: 10 })
  const Roledata = ref<UserVo[]>()
  /** 选中的角色 **/
  const roleDtos = ref<RoleDto[]>([])

  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  watchPostEffect(() => {
    if (!isNullOrUnDef(deptName.value)) {
      deptTreeRef.value?.filter(deptName.value)
    }
  })

  /**
   * 获取用户列表
   */
  const onload = async (searchForm?: any) => {
    const response = await userPage({ ...page.value, ...searchForm, deptIds: unref(deptIds)?.join(',') })
    page.value.total = response.total
    Roledata.value = response.records
    return response.records
  }

  /**
   * 过滤部门树
   */
  const filterNode = (value: FilterValue, data: TreeNodeData) => {
    if (!value) return true
    return data.name.indexOf(value) !== -1
  }

  /**
   * 获取部门树
   */
  const getDeptTree = async () => {
    const data = await deptTree()
    deptTreeData.value = data
  }

  /**
   * 获取角色列表
   */
  const getRolesList = () => {
    rolesList().then((res) => {
      roleDtos.value = res
    })
  }

  getDeptTree()

  /**
   * 表单打开前回调
   */
  const openBefore = () => {
    getRolesList()
  }

  /**
   * 表单关闭前回调
   */
  const closeBefore = () => {
    roleDtos.value = []
    deptIds.value = []
  }

  /**
   * 部门树节点点击事件
   */
  const handleNodeClick = (data: TreeNodeData) => {
    deptIds.value = []
    deptIds.value.push(data.id)
    getDeptNodeChildrenId(unref(deptIds)!, data.children)
    onload()
  }

  const toUpdateRow = (formModel: UserVo) => {
    updateUser(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: UserVo) => {
    createUser(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: UserVo) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.username} ?`).then(() => {
      return deleteUser(formModel.userId).then(() => {
        onload()
      })
    })
  }

  /**
   * 部门树id 拍平
   */
  const getDeptNodeChildrenId = (deptIds: number[], node: Dept[]) => {
    for (const dataKey in node) {
      const dept = node[dataKey]
      deptIds.push(dept.id)
      if (dept.children !== null) {
        getDeptNodeChildrenId(deptIds, dept.children)
      }
    }
  }
</script>
<style lang="scss" scoped></style>

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
  <el-dialog
    v-model="dialogVisible"
    :title="$t(`table.` + title + `Dialog`)"
    width="40%">
    <el-form ref="menuForm" :model="form" label-width="120px">
      <el-row :span="4">
        <el-col :xl="12" :lg="12">
          <el-form-item label="菜单标识:">
            <el-input v-model="form.id" disabled clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="名称:" prop="name">
            <el-input v-model="form.name" clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="授权标识:" prop="permission">
            <el-input v-model="form.permission" :disabled="form.type === 0"
                      clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="国际化:" prop="internationalization">
            <el-input v-model="form.internationalization"
                      clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="路由路径:" prop="path">
            <el-input v-model="form.path" :disabled="form.type === 1" clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="排序:" prop="sort">
            <el-input v-model.number="form.sort" clearable/>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item label="上级菜单:" prop="parentId">
            <el-cascader
              v-model="form.parentId"
              :options="menuDatas"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xl="12" :lg="12">
          <el-form-item
            label="类型:" prop="type">
            <el-radio-group v-model="form.type" @change="change">
              <el-radio :label="0" border>菜单
              </el-radio>
              <el-radio :label="1" border>按钮
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click='toClose'>{{ $t(`button.cancel`) }}</el-button>
              <el-button
                type="primary"
                @click="_title === 'edit' ? toUpdateRow() : toSaveRow() ">{{ $t(`button.confirm`) }}</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import { updateMenu, menuTree, createMenu } from '@/api/menu'
import { ElNotification } from 'element-plus'

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  row: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['refreshTableData'])

const dialogVisible = ref(props.status)

const menuDatas = ref(null)

const _title = ref(props.title)

const form = ref(props.row)

const change = val => {
  if (val === 0) {
    form.value.permission = ''
  } else {
    form.value.path = ''
  }
}

const loadOptions = () => {
  menuTree({ disabled: true }).then(response => {
    menuDatas.value = response
    const menu = { value: 0, label: '根菜单' }
    menuDatas.value.unshift(menu)
  })
}

watch(dialogVisible, () => {
  if (dialogVisible.value) {
    loadOptions()
  }
}, {
  immediate: true
})

const toUpdateRow = () => {
  updateMenu(form.value)
  dialogVisible.value = false
}

const toSaveRow = () => {
  form.value.parentId = form.value.parentId[form.value.parentId.length - 1]
  createMenu(form.value).then(() => {
    ElNotification({
      title: 'Success',
      message: 'Create success',
      type: 'success'
    })
    emits('refreshTableData')
  })
  dialogVisible.value = false
}

const toClose = () => {
  dialogVisible.value = false
  emits('refreshTableData')
}
</script>

<style lang='scss' scoped>

</style>

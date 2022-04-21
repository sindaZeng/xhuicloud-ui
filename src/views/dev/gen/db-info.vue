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
  <el-dialog v-model='dbInfoVisible' title='库信息' :before-close='toClose'>
    <el-steps :active='active' finish-status='success' simple style='margin-top: 20px'>
      <el-step title='模块信息' />
      <el-step title='选择库表' :status='stepStatus' />
    </el-steps>
    <div class='warning custom-block'>
      <p class='custom-block-title'>WARNING</p>
      <p>{{ stepStatus === 'success' ? msg2 : msg1 }} </p>
    </div>
    <el-form v-if='active == 0'
             :model='form'
             ref='dbFormRef'
             :rules='rules'
             style='padding-top: 20px;max-width: 460px'
             label-width='120px' label-position='right'>
      <el-form-item label='数据库ID' prop='id'>
        <el-input v-model='form.id' disabled />
      </el-form-item>
      <el-form-item label='模块名称' prop='moduleName'>
        <el-input v-model='form.moduleName' />
      </el-form-item>
      <el-form-item label='包名路径' prop='packagePath'>
        <el-input v-model='form.packagePath' />
      </el-form-item>
      <el-form-item label='作者名称' prop='author'>
        <el-input v-model='form.author' />
      </el-form-item>
      <el-form-item label='表名前缀' prop='tablePrefix'>
        <el-input v-model='form.tablePrefix' />
      </el-form-item>
      <el-form-item label='去表前缀' prop='toReplace'>
        <el-checkbox-group v-model='form.toReplace' size='large' @change='toReplace'>
          <el-checkbox-button :label='0'>后端</el-checkbox-button>
          <el-checkbox-button :label='1'>前端</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label='前端代码' prop='genVue'>
        <el-radio-group v-model='form.genVue' size='large' @change='toReplace'>
          <el-radio-button :label='0'>No</el-radio-button>
          <el-radio-button :label='1'>Yes</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <xhui-draggable v-if='active == 2' v-model:list1='list1' v-model:list2='list2' :title1='`未选中`' :title2='`已选中`' />
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='toClose'>Cancel</el-button>
        <el-button type='primary' @click='returnOne' v-if='active != 0 && stepStatus != `success`'
        >上一步</el-button>
        <el-button type='primary' @click='nextOne' v-if='active != 2 && stepStatus != `success`'
        >下一步</el-button>
        <el-button type='primary' @click='generateCode' v-else>Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import xhuiDraggable from '@/components/Draggable'
import { dbInfo, codeDown } from '@/api/db'
import { useI18n } from 'vue-i18n'

const form = ref({})

const stepStatus = ref('')

const msg1 = ref('如果不选择，将生成当前选择数据库中所有表的代码哦')

const msg2 = ref('一键生成: 生成当前选择数据库的所有表哦')

const active = ref(0)

const list1 = ref([])

const list2 = ref([])

const i18n = useI18n()

const dbFormRef = ref(null)

const dbInfoVisible = ref(false)

const nextOne = () => {
  dbFormRef.value.validate(valid => {
    if (valid) {
      active.value = active.value + 2
    }
  })
}

const returnOne = () => {
  active.value = active.value - 2
}

const toReplace = () => {
  if (form.value.toReplace.indexOf(1) !== -1) {
    form.value.genVue = 1
  }
}

const rules = ref({
  moduleName: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.moduleNameNotNull')
  }],
  author: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.authorNotNull')
  }],
  packagePath: [{
    required: true,
    trigger: 'blur',
    message: i18n.t('msg.packagePath')
  }]
})

const init = (dbId, type) => {
  stepStatus.value = type
  form.value.id = dbId
  form.value.genVue = 0
  getDbInfo(dbId)
  dbInfoVisible.value = true
}

const toClose = () => {
  dbInfoVisible.value = false
  active.value = 0
  list1.value = []
  list2.value = []
  form.value = {}
}

const generateCode = () => {
  if (stepStatus.value === 'success') {
    dbFormRef.value.validate(valid => {
    })
  }
  form.value.tableName = list2.value.map(item => {
    return item.name
  })
  codeDown(form.value).then(res => {
    // toClose()
  })
}

const getDbInfo = dbId => {
  dbInfo(dbId).then(response => {
    response.forEach(item => {
      list1.value.push({
        id: item.tableName,
        name: item.tableName,
        comment: item.tableComment
      })
    })
  }).catch(() => {
  })
}

/**
 * 暴露出去提供调用
 */
defineExpose({ init })
</script>

<style lang='scss' scoped>
.custom-block.warning {
  padding: 8px 16px;
  background-color: var(--block-warning-bg-color);
  border-radius: 4px;
  border-left: 5px solid var(--el-color-danger);
  margin: 20px 0;
}

.custom-block .custom-block-title {
  font-weight: 700;
}

p, ol, ul {
  margin: 1rem 0;
  line-height: 1.7;
}
</style>

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
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="data"
    @open-before="openBefore"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
    @toUpdateRow="toUpdateRow"
  >
    <!-- 展开行使用示例 -->
    <template #expand="row">
      <el-row>
        <el-col :span="6">
          <div class="image__error">
            <div class="block">
              <el-image />
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <el-row class="expandRow first">
            <el-col :span="4">AppId:</el-col>
            <el-col :span="8">{{ row.data.appId }}</el-col>
            <el-col :span="4">
              <el-button :icon="Search" type="success" @click="openToken(row.data.appId)">查看Token</el-button>
            </el-col>
            <el-col :span="4">
              <el-button @click="genQrCode(row.data.appId)">
                <template #icon>
                  <xh-svg icon="QrCode"></xh-svg>
                </template>
                场景二维码
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-button :icon="Refresh" type="warning" @click="toClearQuota(row.data.appId)"> 接口次数清空 </el-button>
            </el-col>
          </el-row>
          <el-row class="expandRow">
            <el-col :span="4">AppSecret:</el-col>
            <el-col :span="20">{{ row.data.appSecret }}</el-col>
          </el-row>
          <el-row class="expandRow">
            <el-col :span="4">AppAuthToken:</el-col>
            <el-col :span="20">{{ row.data.appAuthToken }}</el-col>
          </el-row>
          <el-row class="expandRow">
            <el-col :span="4">AppDecrypt:</el-col>
            <el-col :span="20">{{ row.data.appDecrypt }}</el-col>
          </el-row>
          <el-row class="expandRow">
            <el-col :span="4">RedirectUrl:</el-col>
            <el-col :span="20">{{ row.data.redirectUrl }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
  </Crud>
  <el-dialog v-model="qrCodedialogVisible" :title="'场景值:' + sceneStr" width="30%" :before-close="handleClose" center>
    <el-image style="margin-left: 50px; width: 400px; height: 400px" :src="sceneCodeUrl" />
  </el-dialog>
</template>
<script lang="tsx" setup>
  import {
    accessToken,
    accountPage,
    createAccount,
    deleteAccount,
    updateAccount,
    clearQuota,
    qrCode
  } from '@/api/wechat/account'
  import { FormActionButtonGroupProps } from '@/components/XhForm/form-action'
  import { Pagination } from '@/components/XhTable/pagination'
  import { ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { checkPermission } from '@/utils'
  import { tableColumn } from '.'
  import { Refresh, Search } from '@element-plus/icons-vue'
  import { isEmpty, isNullOrUnDef } from '@/utils/is'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_account', false),
      editBtn: checkPermission('sys_editor_account', false),
      delBtn: checkPermission('sys_delete_account', false)
    }
  })
  const qrCodedialogVisible = ref(false)
  const sceneStr = ref<string>('')
  const sceneCodeUrl = ref<string>('')
  const data = ref<Account[]>()
  const page = ref<Pagination>({ current: 1, size: 10 })
  const search: FormActionButtonGroupProps = {
    show: true,
    showSearchButton: true,
    showResetButton: true,
    showShowUpButton: true
  }

  /**
   *
   * @param formModel 重置appSecret 防止全是***
   */
  const openBefore = (formModel: Account) => {
    if (formModel && formModel.appSecret) {
      formModel.appSecret = ''
    }
  }

  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await accountPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    data.value = response.records
    return response.records
  }

  const toUpdateRow = (formModel: Account) => {
    updateAccount(formModel).then(() => {
      onload()
    })
  }

  const toSaveRow = (formModel: Account) => {
    createAccount(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: Account) => {
    ElMessageBox.confirm('Are you confirm to delete ' + formModel.id + ' ?').then(() => {
      return deleteAccount(formModel.id).then(() => {
        onload()
      })
    })
  }

  const openToken = (appid: string) => {
    const autosize = { minRows: 2, maxRows: 4 }
    accessToken(appid).then((response) => {
      ElMessageBox.alert(
        () => <el-input v-model={response} autosize={autosize} type="textarea" disabled />,
        'Access_token',
        {
          dangerouslyUseHTMLString: true
        }
      )
    })
  }

  const toClearQuota = (appid: string) => {
    ElMessageBox.confirm('是否要清空微信接口调用次数?', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      clearQuota(appid)
    })
  }

  const genQrCode = (appid: string) => {
    ElMessageBox.prompt('请输入场景值', '场景二维码', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputValidator: (value: string) => !isEmpty(value) && !isNullOrUnDef(value),
      inputErrorMessage: '请输入场景值!'
    }).then(({ value }) => {
      sceneStr.value = value
      qrCode(appid, value).then((response) => {
        sceneCodeUrl.value = response
        qrCodedialogVisible.value = true
      })
    })
  }
  const handleClose = () => {
    sceneStr.value = ''
    sceneCodeUrl.value = ''
    qrCodedialogVisible.value = false
  }
</script>
<style lang="scss" scoped>
  .expandRow {
    margin-bottom: 30px;
  }
  .first {
    margin-top: 30px;
  }
  .image__error .block {
    padding: 30px 0;
    text-align: center;
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
    vertical-align: top;
  }

  .image__error .el-image {
    padding: 0 5px;
    max-width: 300px;
    max-height: 200px;
    width: 100%;
    height: 200px;
  }
</style>

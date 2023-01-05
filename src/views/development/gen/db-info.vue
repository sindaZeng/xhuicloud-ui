<template>
  <el-dialog v-model="dbInfoVisible" :title="$t('dbInfoVue.DbInfo')" :before-close="cancel">
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step :title="$t('dbInfoVue.ModuleInfo')" />
      <el-step :title="$t('dbInfoVue.CheckDb')" :status="stepStatus" />
    </el-steps>
    <el-alert
      v-if="active == 2"
      style="margin-top: 10px"
      :title="$t('status.warn')"
      type="warning"
      :description="$t('dbInfoVue.GenAllMsg')"
      show-icon
      :closable="false"
    />
    <el-form
      v-if="active == 0"
      ref="dbFormRef"
      :model="form"
      :rules="rules"
      style="padding-top: 20px; max-width: 460px"
      label-width="120px"
      label-position="right"
    >
      <el-form-item :label="$t('dbInfoVue.DbId')" prop="id">
        <el-input v-model="form.id" disabled />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.ModuleName')" prop="moduleName">
        <el-input v-model="form.moduleName" />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.ContextPath')" prop="contextPath">
        <el-input v-model="form.contextPath" />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.PackagePath')" prop="packagePath">
        <el-input v-model="form.packagePath" />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.Author')" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.TablePrefix')" prop="tablePrefix">
        <el-input v-model="form.tablePrefix" />
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.toReplace')" prop="toReplace">
        <el-checkbox-group v-model="form.toReplace" size="large" @change="toReplace">
          <el-checkbox-button :label="0">{{ $t('dbInfoVue.serverCode') }}</el-checkbox-button>
          <el-checkbox-button :label="1">{{ $t('dbInfoVue.webCode') }}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('dbInfoVue.genWeb')" prop="genWeb">
        <el-radio-group v-model="form.genWeb" size="large" @change="toReplace">
          <el-radio-button :label="0">{{ $t('status.no') }}</el-radio-button>
          <el-radio-button :label="1">{{ $t('status.yes') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.genWeb == 1" :label="$t('dbInfoVue.WebLang')" prop="isTs">
        <el-radio-group v-model="form.isTs" size="large">
          <el-radio-button :label="0">{{ $t('dbInfoVue.TS') }}</el-radio-button>
          <el-tooltip effect="dark" :content="$t('dbInfoVue.GenJsWeb')" placement="top">
            <el-radio-button :label="1">{{ $t('dbInfoVue.JS') }}</el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="text-align: center; margin-top: 10px">
      <el-transfer
        v-if="active == 2"
        v-model="checkDbData"
        filterable
        :filter-placeholder="$t('dbInfoVue.enterTableName')"
        :filter-method="filterMethod"
        :data="dbData"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">
          {{ $t('button.cancel') }}
        </el-button>
        <el-button v-if="active != 0 && stepStatus != `success`" type="primary" @click="returnOne">
          {{ $t('button.returnStep') }}
        </el-button>
        <el-button v-if="active != 2 && stepStatus != `success`" type="primary" @click="nextOne">
          {{ $t('button.nextStep') }}
        </el-button>
        <el-button v-else type="primary" :disabled="!checkPermission('sys_download_code', false)" @click="generateCode">
          {{ $t('button.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { dbInfo, downloadFile } from '@/api/generator/db'
  import { FormInstance } from 'element-plus'
  import { ref } from 'vue'
  import { checkPermission } from '@/utils'
  import { global } from '@/i18n'
  interface Option {
    key: string
    label: string
  }
  const rules = ref({
    moduleName: [
      {
        required: true,
        trigger: 'blur',
        message: global.t('msg.moduleNameNotNull')
      }
    ],
    contextPath: [
      {
        required: true,
        trigger: 'blur',
        message: global.t('msg.contextPathNotNull')
      }
    ],
    author: [
      {
        required: true,
        trigger: 'blur',
        message: global.t('msg.authorNotNull')
      }
    ],
    packagePath: [
      {
        required: true,
        trigger: 'blur',
        message: global.t('msg.packagePath')
      }
    ]
  })

  const form = ref<GenCode>({})
  const dbInfoVisible = ref<boolean>(false)
  const active = ref(0)
  const stepStatus = ref('')
  const dbData = ref<Option[]>([])
  const checkDbData = ref<string[]>([])
  const dbFormRef = ref<FormInstance>()

  const toReplace = () => {
    if (form.value.toReplace?.indexOf(1) !== -1) {
      form.value.genWeb = 1
      form.value.isTs = 0
    }
  }
  const nextOne = () => {
    dbFormRef.value?.validate((valid) => {
      if (valid) {
        active.value = active.value + 2
      }
    })
  }

  const returnOne = () => {
    active.value = active.value - 2
  }

  const getDbInfo = (dbId: number) => {
    dbInfo(dbId).then((response) => {
      response.forEach((item) => {
        console.log(item)
        dbData.value.push({
          key: item.tableName,
          label: item.tableName
        })
      })
    })
  }
  const init = (dbId: number, type: string) => {
    stepStatus.value = type
    form.value.id = dbId
    form.value.genWeb = 0
    getDbInfo(dbId)
    dbInfoVisible.value = true
  }

  const filterMethod = (query: any, item: any) => {
    return item.key.includes(query.toLowerCase())
  }

  const generateCode = () => {
    if (stepStatus.value === 'success') {
      dbFormRef.value?.validate((valid) => {
        if (valid) {
          downloadFile(form.value).then(() => {
            cancel()
          })
        }
      })
    } else {
      form.value.tableName = checkDbData.value.map((item) => {
        return item
      })
      downloadFile(form.value).then(() => {
        cancel()
      })
    }
  }
  const cancel = () => {
    dbInfoVisible.value = false
    form.value = {}
    active.value = 0
    stepStatus.value = ''
    dbData.value = []
    checkDbData.value = []
  }
  defineExpose({ init })
</script>
<style lang="scss" scoped></style>

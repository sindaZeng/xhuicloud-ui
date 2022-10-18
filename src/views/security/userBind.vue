<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="验证身份"> </el-step>
    <el-step :title="'绑定' + updateProp" />
    <el-step title="绑定结果" :status="bindResultStepStatus" />
  </el-steps>

  <div v-if="active != 3" style="padding: 60px 0">
    <div class="form-group">
      <el-input v-model="newModel" :disabled="active === 1">
        <template #prepend>{{ (active === 1 ? '原' : '新') + updateProp }}</template>
      </el-input>
      <div class="error-message">{{ msg }}</div>
    </div>
    <div class="form-group">
      <div>
        <div class="code" style="width: 250px; margin-right: 12px; float: left">
          <el-input v-model="code" placeholder="请输入验证码" maxlength="6"> </el-input>
        </div>
        <el-button
          style="width: 88px; height: 32px; padding-left: 0; padding-right: 0; float: left"
          :disabled="sendMsg.canSend"
          @click="handleSend"
        >
          {{ showMsgText }}
        </el-button>
      </div>
    </div>

    <div class="form-group">
      <el-button type="primary" style="width: 100%; height: 40px; margin-top: 30px" @click="nextOne">下一步</el-button>
    </div>
  </div>
  <div v-else>
    <el-result :icon="bindResultStatus" :title="bindResultTitle" :sub-title="bindResultSubTitle">
      <template #extra>
        <el-button v-if="bindResultStepStatus === 'error'" type="primary" @click="active = 2">Back</el-button>
      </template>
    </el-result>
  </div>
</template>
<script lang="ts" setup>
  import { checkSmsCode, sendSmsCode } from '@/api/upms/mobile'
  import { updateUserPhone } from '@/api/upms/user'
  import { ref, reactive, unref } from 'vue'
  import { userBindProps } from './userBind'

  const props = defineProps(userBindProps)

  const active = ref<number>(props.active)

  const newModel = ref<string>(props.updateModel)

  const bindResultStepStatus = ref<string>('success')
  const bindResultStatus = ref<string>('error')
  const bindResultTitle = ref<string>('绑定失败')
  const bindResultSubTitle = ref<string>('')

  const msg = ref('')
  const code = ref('')
  const sendMsg = reactive({
    msgText: '发送验证码',
    msgSuccess: 'time秒后重发',
    msgTime: 60,
    canSend: false
  })
  const showMsgText = ref(sendMsg.msgText)

  const handleSend = () => {
    if (sendMsg.canSend) return
    sendSmsCode(unref(newModel)).then(() => {
      computeTime()
    })
  }

  const computeTime = () => {
    showMsgText.value = sendMsg.msgSuccess.replace('time', sendMsg.msgTime + '')
    sendMsg.canSend = true
    const time = setInterval(() => {
      sendMsg.msgTime--
      showMsgText.value = sendMsg.msgSuccess.replace('time', sendMsg.msgTime + '')
      if (sendMsg.msgTime === 0) {
        sendMsg.msgTime = 60
        showMsgText.value = '发送验证码'
        sendMsg.canSend = false
        clearInterval(time)
      }
    }, 1000)
  }

  const nextOne = () => {
    if (unref(code)) {
      msg.value = ''
      const result = props.validate?.(unref(newModel))
      if (typeof result === 'boolean') {
        if (result) {
          checkSmsCode({ code: unref(code), mobile: unref(newModel) })
            .then(() => {
              active.value++
              if (unref(active) == 3) {
                updateUserPhone(unref(newModel))
                  .then(() => {
                    bindResultStatus.value = 'success'
                    bindResultTitle.value = '绑定成功'
                    bindResultStepStatus.value = 'success'
                  })
                  .catch((ex: any) => {
                    bindResultStepStatus.value = 'error'
                    bindResultStatus.value = 'error'
                    bindResultTitle.value = '绑定失败'
                    bindResultSubTitle.value = ex.response.data.msg
                  })
              }
              newModel.value = ''
              msg.value = ''
              code.value = ''
            })
            .catch((ex: Error) => {
              msg.value = ex.message
            })
        } else {
          msg.value = '填写不正确'
        }
      } else {
        msg.value = result
      }
    } else {
      msg.value = '验证码不能为空!'
    }
  }
</script>
<style lang="scss" scoped>
  .form-group {
    width: 350px;
    margin: 0 auto;
  }
  .error-message {
    min-height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #e40c0c;
  }
</style>

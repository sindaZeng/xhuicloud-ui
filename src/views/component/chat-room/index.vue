<template>
  <div class="chat-container">
    <el-alert :title="alertTitle" type="info" center :closable="false" />
    <div class="chat-message-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat-message"
        :class="{ 'right-message': message.userId == userIdStr }"
      >
        <img v-if="message.userId != userIdStr" class="avatar left-avatar" :src="systemAvatar" />
        <div
          class="message-bubble"
          :class="{ 'right-bubble': message.userId == userIdStr }"
          v-html="marked(message.text)"
        ></div>
        <img v-if="message.userId == userIdStr" class="avatar right-avatar" :src="user.getSysUser.avatar" />
      </div>
    </div>
    <div class="chat-input-container">
      <div v-if="showModal" class="bounce-in-top">11</div>
      <input
        v-model="inputText"
        type="text"
        class="chat-input"
        placeholder="请输入发送内容"
        @keyup.enter="toSendMessage"
      />
      <el-button
        class="action-button"
        type="success"
        size="large"
        :icon="Plus"
        circle
        @click="showModal = !showModal"
      />
      <button
        class="send-button"
        :class="{ 'dont-send-button': isEmpty(inputText) }"
        :disabled="isEmpty(inputText)"
        @click="toSendMessage"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import { ref, onMounted } from 'vue'
  import useStore from '@/store'
  import { isEmpty } from '@/utils/is'
  import { cloneDeep } from 'lodash'
  import useMqtt from '@/hooks/useMqtt'
  import { marked } from 'marked'
  import { getConversation } from '@/api/chatroom/conversation'

  const { user } = useStore()
  const userIdStr = user.getSysUser.userId.toString()
  const { send, subscribe, onMessage } = useMqtt({
    host: `${import.meta.env.VITE_WS_API}`,
    port: 15000,
    path: `/mqtt?session_id=${user.getSessionId}&tenant_id=${user.getTenantId}`,
    username: userIdStr,
    password: userIdStr,
    clientId: userIdStr
  })
  const inputText = ref('')
  const topic = 'topic-chat-' + userIdStr
  const showModal = ref(false)
  const alertTitle = ref('系统客服')
  const systemAvatar = 'https://xhuicloud.oss-cn-shenzhen.aliyuncs.com/xhuicloud-logo.png'
  const messages = ref<Message[]>([])

  const changeAlertTitle = () => {
    for (let i = 0; i < 4; i++) {
      if (alertTitle.value.length === 8) {
        alertTitle.value = '正在输入'
      }
      alertTitle.value += '.'
    }
  }

  const messageHandle = (payload: MessagePayload) => {
    if ('[DONE]' === payload.text) {
      alertTitle.value = '系统客服'
      return
    } else {
      changeAlertTitle()
    }
    const message = messages.value[0]
    if (message.messageId && message.messageId === payload.messageId && payload.userId != message.userId) {
      const msg = {
        messageId: payload.messageId,
        text: payload.text,
        userId: 'system'
      } as Message
      messages.value.unshift(cloneDeep(msg))
    } else {
      message.text += payload.text
    }
  }

  const toSendMessage = () => {
    const text = cloneDeep(inputText.value)
    inputText.value = ''
    const data: Message = {
      messageId: new Date().getTime() + userIdStr,
      userId: userIdStr,
      text
    }
    messages.value.unshift(data)
    alertTitle.value = '正在输入'
    send(topic, JSON.stringify(data))
  }

  onMounted(() => {
    getConversation().then((res) => {
      messages.value = res
      if (messages.value.length == 0) {
        messages.value.push({
          text: '你好，有什么可以帮助您的？',
          userId: 'system'
        } as Message)
      }
    })
    subscribe(topic)

    onMessage((message) => {
      if (message.payload.userId != userIdStr) {
        messageHandle(message.payload)
      }
    })
  })
</script>
<style lang="scss">
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .el-alert__title {
      font-size: 20px !important;
      color: black !important;
    }
  }

  .chat-message-container {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column-reverse;
  }

  .chat-message {
    display: flex;
    margin-bottom: 20px;
  }

  .avatar {
    width: 50px;
    height: 50px !important;
    border-radius: 25px;
    margin-right: 10px;
  }

  .left-avatar {
    margin-left: 10px;
  }

  .right-avatar {
    margin-right: 0;
    margin-left: 20px;
  }

  .message-bubble {
    position: relative;
    white-space: pre-wrap;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
    background-color: #a0afb1;
  }
  ol {
    margin-left: 20px;
  }
  .right-bubble {
    background-color: #2196f3;
    color: #fff;
    margin-left: auto;
  }

  .chat-input-container {
    display: flex;
    padding: 10px;
  }

  .chat-input {
    flex: 1;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 0 20px;
  }

  .send-button {
    height: 40px;
    width: 80px;
    border-radius: 20px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-left: 5px;
  }

  .action-button {
    width: 40px;
    height: 40px;
    margin-left: 5px;
  }

  .dont-send-button {
    background-color: #3f4041;
  }

  .bounce-in-top {
    position: absolute;
    right: 25px;
    bottom: 12%;
    background-color: #caccce;
    width: 300px;
    height: 170px;
    -webkit-animation: bounce-in-top 1s;
    animation: bounce-in-top 1s;
    border-radius: 10px;
  }
</style>

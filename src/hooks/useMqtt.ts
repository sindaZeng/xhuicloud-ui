import { ref, onMounted, onBeforeUnmount } from 'vue'
import mqtt from 'mqtt/dist/mqtt'
import { MqttClient } from 'mqtt'
import setting from '@/config/setting.config'
import { storageLocal } from '@/utils/storage'
import { isNullOrUnDef } from '@/utils/is'

export default function useMqtt(mqttOptions?: MqttHookOptions) {
  const client = ref<MqttClient | null>(null)
  const isConnect = ref(false)
  /**
   * 连接
   */
  function connect() {
    if (isNullOrUnDef(mqttOptions)) {
      mqttOptions = storageLocal.getItem<MqttHookOptions>(setting.mqttKey)
    } else {
      storageLocal.setItem(setting.mqttKey, mqttOptions)
    }
    const options = {
      ...mqttOptions,
      reconnectPeriod: 1000
    }
    if (isNullOrUnDef(client.value)) {
      client.value = mqtt.connect(options)
      console.log('mqtt connect success ')
      isConnect.value = true
    }
  }

  /**
   * 断开连接
   */
  function disconnect() {
    if (client.value) {
      client.value.end()
    }
    isConnect.value = false
  }

  /**
   * 发送主题消息
   * @param topic 主题 此处一般为 主题 + 用户id
   * @param payload
   */
  function send(topic: string, payload: string) {
    if (client.value) {
      client.value.publish(topic, payload)
    }
  }

  /**
   * 订阅主题消息
   * @param topic 主题 此处一般为 主题 + 用户id
   */
  function subscribe(topic: string | string[]) {
    if (client.value) {
      console.log('mqtt subscribe topic: ' + topic)
      client.value.subscribe(topic)
    }
  }

  /**
   * 消息回调
   * @param callback
   */
  function onMessage(callback: (message: MqttMessage) => void) {
    client.value!.on('message', (topic, payload) => {
      callback({ topic, payload: JSON.parse(payload.toString()) })
    })
  }

  /**
   * 连接关闭回调
   */
  function close() {
    if (client.value) {
      client.value.on('close', () => {
        console.log('MQTT connection closed')
        // 执行连接丢失时的操作
      })
    }
  }

  onMounted(() => {
    connect()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    client,
    connect,
    disconnect,
    send,
    close,
    subscribe,
    onMessage
  }
}

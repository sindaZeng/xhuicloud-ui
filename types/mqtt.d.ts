declare module 'mqtt/dist/mqtt' {
  import MQTT from 'mqtt'
  export = MQTT
}

interface MqttHookOptions {
  host: string
  port?: number
  path?: string
  username?: string
  password?: string
  clientId?: string
  protocol?: 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs'
}

interface MqttMessage {
  topic: string
  payload: MessagePayload
}

interface MessagePayload {
  messageId: string
  userId: string
  text: string
}

import { ref, onMounted, onUnmounted, Ref } from 'vue'

interface Heartbeat {
  interval: number
  timeout: number
  pingTimeoutObj: any
  pongTimeoutObj: any
  pingMessage: string
}
export const useWebSocket = (
  url: string,
  messageCallback: (event: any) => any
): {
  sendMessage: (data: any) => void
  message: Ref<string | null>
  reconnect: () => void
  isConnected: Ref<boolean>
} => {
  const ws = ref<WebSocket | null>(null)
  const message = ref<string | null>(null)
  const isConnected = ref(false)
  const heartbeat = ref<Heartbeat>({
    interval: 3 * 1000, // 心跳间隔时间
    timeout: 1 * 1000, // 响应超时时间
    pingTimeoutObj: null, // 延时发送心跳的定时器
    pongTimeoutObj: null, // 接收心跳响应的定时器
    pingMessage: JSON.stringify({ type: 'ping' }) // 心跳请求信息
  })
  const sendMessage = (data: any) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(data)
    } else {
      console.error('WebSocket is not connected.')
    }
  }

  const reconnect = () => {
    ws.value = new WebSocket(url)

    ws.value.addEventListener('open', () => {
      isConnected.value = true
      startHeartbeat()
      console.log('WebSocket connected success. ')
    })

    ws.value.addEventListener('message', (event) => {
      //收到服务器信息，心跳重置并发送
      startHeartbeat()
      if (event.data.indexOf('pong') > 0) {
        // console.log('websocket pong')
        return
      }
      message.value = event.data
      messageCallback(event)
    })

    ws.value.addEventListener('close', () => {
      isConnected.value = false
      console.log('WebSocket closed, try to reconnect...')
      setTimeout(() => reconnect(), 1000)
    })

    ws.value.addEventListener('error', (event) => {
      console.error('WebSocket error:', event)
    })
  }

  /**
   * 开启心跳
   */
  const startHeartbeat = () => {
    const webSocket = ws.value!
    const heart = heartbeat.value
    // 清空定时器
    clearTimeoutObj(heart)
    // 延时发送下一次心跳
    heart.pingTimeoutObj = setTimeout(() => {
      // 如果连接正常
      if (webSocket.readyState === 1) {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        // console.log('websocket ping')
        webSocket.send(heart.pingMessage)
        // 心跳发送后，如果服务器超时未响应则断开，如果响应了会被重置心跳定时器
        heart.pongTimeoutObj = setTimeout(() => {
          webSocket.close()
        }, heart.timeout)
      } else {
        // 否则重连
        reconnect()
      }
    }, heart.interval)
  }

  /**
   * 清空定时器
   */
  const clearTimeoutObj = (heartbeat: Heartbeat) => {
    heartbeat.pingTimeoutObj && clearTimeout(heartbeat.pingTimeoutObj)
    heartbeat.pongTimeoutObj && clearTimeout(heartbeat.pongTimeoutObj)
  }
  onMounted(() => {
    reconnect()
    startHeartbeat()
  })

  onUnmounted(() => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.close()
    }
    ws.value = null
  })

  return { sendMessage, message, reconnect, isConnected }
}

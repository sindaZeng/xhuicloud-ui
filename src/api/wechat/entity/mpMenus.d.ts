interface WeChatMpMenu {
  key: string
  name: string
  type?: string
  appid?: string // 小程序AppId
  resContent?: string // 点击事件响应内容
  resType?: string // 点击事件响应类型
  url?: string
  pagepath?: string
  subButtonList: WeChatMpMenu[]
}

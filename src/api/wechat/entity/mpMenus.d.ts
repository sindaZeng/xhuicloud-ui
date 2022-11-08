interface WeChatMpMenu {
  name: string
  type: number
  actList: Act[]
  subButtonList: Subbutton[]
}

interface Subbutton {
  name: string
  actList: Act[]
  type: number
  subButtonList?: WeChatMpMenu[]
}

interface Act {
  key: string
  type: number
  value: string
}

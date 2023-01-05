interface Draft {
  mediaId: string
  content: Content
  updateTime: number
}

interface Content {
  newsItem: NewsItem[]
}

interface NewsItem {
  title: string // 标题
  author: string // 作者
  digest: string // 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空。如果本字段为没有填写，则默认抓取正文前54个字。
  content: string // 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS,涉及图片url必须来源 "上传图文消息内的图片获取URL"接口获取。外部图片url将被过滤。
  contentSourceUrl: string // 图文消息的原文地址，即点击“阅读原文”后的URL
  thumbMediaId: string // 图文消息的封面图片素材id（必须是永久MediaID）
  showCoverPic: number // 是否显示封面，0为false，即不显示，1为true，即显示(默认)
  needOpenComment: number // 是否打开评论，0不打开(默认)，1打开
  onlyFansCanComment: number // 是否粉丝才可评论，0所有人可评论(默认)，1粉丝才可评论
  url: string // 草稿的临时链接,点击图文消息跳转链接
  thumbUrl: string // 图文消息的封面url
}

interface WxMpUpdateDraft {
  mediaId: string // 要修改的图文消息的id
  index?: number // 要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
  articles: NewsItem
}

interface EditorProps {
  appid: string
  index?: number
  formData?: NewsItem
  contextMediaId: string
}

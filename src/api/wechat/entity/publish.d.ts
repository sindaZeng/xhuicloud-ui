interface Publish {
  articleId: string
  content: Content
  updateTime: string
}

interface Content {
  newsItem: Item[]
}

interface Item {
  title: string
  author: string
  digest: string
  content: string
  contentSourceUrl: string
  thumbMediaId: string
  showCoverPic: number
  needOpenComment: number
  onlyFansCanComment: number
  thumbUrl: string
  url: string
  isDeleted: boolean
}

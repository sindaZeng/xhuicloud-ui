import { HttpClient } from '@/utils/http'

export function createAndReleaseMpMenu(appId: string, data: any) {
  return HttpClient.post<boolean>({
    url: `/wechat/menu/${appId}/release`,
    data
  })
}

export function getReleaseMpMenu(appId: string) {
  return HttpClient.get<any>({
    url: `/wechat/menu/${appId}`
  })
}

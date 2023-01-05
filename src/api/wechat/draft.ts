/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

import { HttpClient } from '@/utils/http'
import { Page } from '../base'

export function draftPage(appId: string, params: any) {
  return HttpClient.get<Page<Draft>>({
    url: `/wechat/draft/${appId}/page`,
    params
  })
}

export function getContent(appId: string, mediaId: string) {
  return HttpClient.get<Content>({
    url: `/wechat/draft/${appId}`,
    params: { mediaId }
  })
}

export function deleteDraft(appId: string, mediaId: string) {
  return HttpClient.delete<boolean>(
    {
      url: `/wechat/draft/${appId}`,
      params: { mediaId }
    },
    {
      titleMsg: '操作成功',
      successMsg: '删除成功,即将刷新'
    }
  )
}
export function editDraft(appId: string, mediaId: string, articles: NewsItem[]) {
  return HttpClient.put<boolean>({
    url: `/wechat/draft/${appId}/${mediaId}`,
    data: { articles }
  })
}

export function createDraft(appId: string, articles: NewsItem[]) {
  return HttpClient.post<string>({
    url: `/wechat/draft/${appId}`,
    data: { articles }
  })
}

export function singleToMultipleDraft(appId: string, mediaId: string, articles: NewsItem[]) {
  return HttpClient.post<string>({
    url: `/wechat/draft/${appId}/save/${mediaId}`,
    data: { articles }
  })
}

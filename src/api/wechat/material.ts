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
import { Page, UploadFileParams } from '../base'
import { Material } from './entity/material'

export function materialPage(appId: string, params: any) {
  return HttpClient.get<Page<Material>>({
    url: `/wechat/material/${appId}/page`,
    params
  })
}

export function uploadVideoMaterialFile(appId: string, uploadFileParams: UploadFileParams) {
  return HttpClient.uploadFile<boolean>(
    {
      url: `/wechat/material/${appId}/video`,
      params: uploadFileParams.params
    },
    uploadFileParams
  )
}

export function deleteMaterial(appId: string, mediaIds: string[]) {
  return HttpClient.delete<boolean>(
    {
      url: `/wechat/material/${appId}`,
      params: { mediaIds: mediaIds.join(',') }
    },
    {
      titleMsg: '操作成功',
      successMsg: '素材删除成功,即将刷新'
    }
  )
}

export function downloadVideo(appId: string, mediaId: string) {
  return HttpClient.get<any>({
    url: `/wechat/material/${appId}/download/${mediaId}/video`
  })
}

export function download(appId: string, fileName: string, mediaId: string) {
  return HttpClient.downloadFile(
    fileName,
    'mp3',
    {
      url: `/wechat/material/${appId}/download/${mediaId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json; application/octet-stream' },
      responseType: 'arraybuffer'
    },
    {
      successMsg: '即将下载'
    }
  )
}

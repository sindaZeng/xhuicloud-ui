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

enum DsApi {
  DsPage = '/gen/ds/page',
  DsTest = '/gen/ds/test/',
  DbInfo = '/gen/ds/info/',
  Generator = '/gen/generator',
  CreateDs = '/gen/ds',
  UpdateDs = '/gen/ds',
  DeleteDs = '/gen/ds/'
}

export function dsPage(params: any) {
  return HttpClient.get<Page<GenDsInfo>>({
    url: DsApi.DsPage,
    params
  })
}
export function dsTest(dsId: number) {
  return HttpClient.put<boolean>(
    {
      url: DsApi.DsTest + dsId
    },
    {
      titleMsg: '操作成功',
      successMsg: '数据源可用'
    }
  )
}
export function dbInfo(dsId: number) {
  return HttpClient.get<Array<TableInfo>>({
    url: DsApi.DbInfo + dsId
  })
}

export function createDs(data: GenDsInfo) {
  return HttpClient.post<number>(
    {
      url: DsApi.CreateDs,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '数据源添加成功'
    }
  )
}

export function updateDs(data: GenDsInfo) {
  return HttpClient.put<boolean>(
    {
      url: DsApi.UpdateDs,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '数据源修改成功'
    }
  )
}

export function deleteDs(dsId: number) {
  return HttpClient.delete<boolean>(
    {
      url: DsApi.DeleteDs + dsId
    },
    {
      titleMsg: '操作成功',
      successMsg: '数据源删除成功'
    }
  )
}

export function downloadFile(data: GenCode) {
  return HttpClient.downloadFile(
    data.moduleName || 'XhuiCloud',
    'zip',
    {
      url: DsApi.Generator,
      method: 'post',
      headers: { 'Content-Type': 'application/json; application/octet-stream' },
      responseType: 'arraybuffer',
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '即将下载'
    }
  )
}

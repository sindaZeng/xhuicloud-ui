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

enum ClientApi {
  ClientPage = '/admin/client/page',
  GetClientSecretById = '/admin/client/getClientSecretById/',
  CreateClient = '/admin/client',
  UpdateClient = '/admin/client',
  DeleteClient = '/admin/client/'
}

export function clientPage(params: any) {
  return HttpClient.get<Page<SysClient>>({
    url: ClientApi.ClientPage,
    params
  })
}

export function getClientSecretById(id: number) {
  return HttpClient.get<string>({
    url: ClientApi.GetClientSecretById + id
  })
}

export function createClient(data: SysClient) {
  return HttpClient.post<number>(
    {
      url: ClientApi.CreateClient,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '客户端添加成功'
    }
  )
}

export function updateClient(data: SysClient) {
  return HttpClient.put<boolean>(
    {
      url: ClientApi.UpdateClient,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '客户端修改成功'
    }
  )
}

export function deleteClient(ClientId: number) {
  return HttpClient.delete<boolean>(
    {
      url: ClientApi.DeleteClient + ClientId
    },
    {
      titleMsg: '操作成功',
      successMsg: '客户端删除成功'
    }
  )
}

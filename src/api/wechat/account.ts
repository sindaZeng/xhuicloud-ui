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

enum AccountApi {
  AccountPage = '/wechat/account/page',
  AccountList = '/wechat/account/list',
  CreateAccount = '/wechat/account',
  UpdateAccount = '/wechat/account',
  DeleteAccount = '/wechat/account/'
}

export function accountPage(params: any) {
  return HttpClient.get<Page<Account>>({
    url: AccountApi.AccountPage,
    params
  })
}

export function accessToken(appId: string) {
  return HttpClient.get<string>({
    url: `/wechat/account/${appId}/access_token`
  })
}

export function clearQuota(appId: string) {
  return HttpClient.delete<string>(
    {
      url: `/wechat/account/${appId}/clear_quota`
    },
    {
      titleMsg: '操作成功',
      successMsg: '微信接口调用次数已清空'
    }
  )
}

export function qrCode(appId: string, sceneStr: string) {
  return HttpClient.get<string>({
    url: `/wechat/account/${appId}/qrCode`,
    params: { sceneStr }
  })
}

export function accountList(name?: string) {
  return HttpClient.get<Array<Account>>({
    url: AccountApi.AccountList,
    params: { name }
  })
}

export function getByAppId(appId: string) {
  return HttpClient.get<AccountVo>({
    url: `/wechat/account/${appId}`
  })
}

export function createAccount(data: Account) {
  return HttpClient.post<number>(
    {
      url: AccountApi.CreateAccount,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '公众号账户添加成功'
    }
  )
}

export function updateAccount(data: Account) {
  return HttpClient.put<boolean>(
    {
      url: AccountApi.UpdateAccount,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '公众号账户修改成功'
    }
  )
}

export function deleteAccount(accountId: number) {
  return HttpClient.delete<boolean>(
    {
      url: AccountApi.DeleteAccount + accountId
    },
    {
      titleMsg: '操作成功',
      successMsg: '公众号账户删除成功'
    }
  )
}

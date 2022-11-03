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
import { RequestOptions } from '@/utils/http/xhAxiosHandler'

const basicHeader = 'dGVzdDp0ZXN0'
const options: RequestOptions = { withToken: false }

enum AuthApi {
  Token = '/auth/oauth2/token',
  CheckToken = '/auth/oauth/check_token',
  RefreshToken = '/auth/oauth/token',
  GetLoginQrcode = '/admin/wechat-mp/',
  LoginQrcodeScanSuccess = '/admin/wechat-mp/',
  Logout = '/auth/authorize/logout'
}

/**
 * 登录
 * @param params
 */
export function loginApi(params: LoginForm) {
  return HttpClient.post<AuthInfo>(
    {
      url: AuthApi.Token,
      headers: {
        Authorization: 'Basic ' + basicHeader
      },
      params
    },
    options
  )
}

/**
 * 校验登录态
 * @param params
 */
export function checkToken(token: string) {
  return HttpClient.get<any>(
    {
      url: AuthApi.CheckToken,
      headers: {
        Authorization: 'Basic ' + basicHeader
      },
      params: { token }
    },
    options
  )
}

/**
 * 刷新token
 * @param refreshToken
 */
export function refreshToken(refreshToken: string) {
  const params = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    scope: 'server'
  }
  return HttpClient.post<AuthInfo>(
    {
      url: AuthApi.RefreshToken,
      headers: {
        Authorization: 'Basic ' + basicHeader
      },
      params
    },
    options
  )
}

/**
 * 获取微信公众号登录二维码
 */
export function getLoginQrcode(appId: string) {
  return HttpClient.get<string>(
    {
      url: AuthApi.GetLoginQrcode + appId + '/login-qrcode'
    },
    options
  )
}

/**
 * 用户是否扫码成功
 */
export function loginQrcodeScanSuccess(appId: string, ticket: string) {
  return HttpClient.get<boolean>(
    {
      url: AuthApi.LoginQrcodeScanSuccess + appId + '/scan-success',
      params: { ticket }
    },
    options
  )
}

/**
 * 登出
 */
export function logout() {
  return HttpClient.post({
    url: AuthApi.Logout
  })
}

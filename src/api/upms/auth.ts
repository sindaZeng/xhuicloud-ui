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
import { LoginForm, AuthInfo } from '@/api/upms/entity/user'
import { Response } from '~/axios'

const basicHeader = 'dGVzdDp0ZXN0'

enum Api {
    Token = '/auth/oauth/token',
    GetLoginQrcode = '/admin/wechat-mp/login-qrcode',
    LoginQrcodeScanSuccess = '/admin/wechat-mp/scan-success',
}

/**
 * 登录
 * @param params
 */
export function loginApi (params: LoginForm) {
  return HttpClient.get<AuthInfo>({
    url: Api.Token,
    headers: {
      Authorization: 'Basic ' + basicHeader
    },
    params
  }, { withToken: false })
}

/**
 * 获取微信公众号登录二维码
 */
export function getLoginQrcode (appId: string) {
  return HttpClient.get<Response<string>>({
    url: Api.GetLoginQrcode
  }, { withToken: false })
}

/**
 * 用户是否扫码成功
 */
export const loginQrcodeScanSuccess = (appId: string, ticket: string) => {
  return HttpClient.get<Response<boolean>>({
    url: Api.LoginQrcodeScanSuccess,
    params: { ticket }
  }, { withToken: false })
}

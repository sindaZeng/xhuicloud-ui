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

import request from '@/utils/request'

const basicHeader = 'dGVzdDp0ZXN0'

const scope = 'server'

/**
 * 账号密码登录
 * @param loginForm
 * @returns {*}
 */
export const login = loginForm => {
  return request({
    url: '/auth/oauth/token',
    headers: {
      Authorization: 'Basic ' + basicHeader
    },
    method: 'post',
    params: loginForm
  })
}

/**
 * 获取微信公众号登录二维码
 * @returns {*}
 */
export const loginWeChatMpQrCode = appId => {
  return request({
    url: '/admin/wechat-mp/' + appId + '/login-qrcode',
    method: 'get'
  })
}

/**
 * 用户是否扫码成功
 * @returns {*}
 */
export const weChatMpScanSuccess = (appId, ticket) => {
  return request({
    url: '/admin/wechat-mp/' + appId + '/scan-success',
    method: 'get',
    params: { ticket }
  })
}

/**
 * 退出
 * @returns {*}
 */
export const logout = () => {
  return request({
    url: '/auth/oauth2/logout',
    method: 'post'
  })
}

/**
 * 校验凭证
 * @param token
 * @returns {*}
 */
export const checkToken = token => {
  return request({
    url: '/auth/oauth/check_token',
    headers: {
      Authorization: 'Basic ' + basicHeader
    },
    method: 'get',
    params: { token }
  })
}

/**
 * 刷新凭证
 * @param refreshToken
 * @returns {*}
 */
export const refreshToken = refreshToken => {
  const param = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    scope: scope
  }
  return request({
    url: '/auth/oauth/token',
    headers: {
      Authorization: 'Basic ' + basicHeader
    },
    method: 'post',
    params: param
  })
}

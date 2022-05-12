/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the Software), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

export interface LoginForm {
  authCode?: string,
  type?: string,
  username?: string,
  password?: string,
  // eslint-disable-next-line camelcase
  grant_type: string
}

export interface AuthInfo {
  // eslint-disable-next-line camelcase
  access_token: string,
  // eslint-disable-next-line camelcase
  token_type: string,
  // eslint-disable-next-line camelcase
  refresh_token: string
  // eslint-disable-next-line camelcase
  expires_in: number,
  scope: string,
  // eslint-disable-next-line camelcase
  tenant_id: number,
  id: number,
  tenantName: string,
  phone: string
}

export interface SysUser {
  userId?: number,
  username?: string,
  avatar?: string,
  phone?: string,
  email?: string,
  sex?: number,
  tenantId?: number
}

export interface UserInfo {
  sysUser: SysUser,
  permissions: string[],
  roles?: [],
  tenantName?: string
}

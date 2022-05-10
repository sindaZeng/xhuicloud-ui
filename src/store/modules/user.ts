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

import { defineStore } from 'pinia'
import { storageLocal } from '@/utils/storage'
import { encryption } from '@/utils/encrypt'
import setting from '@/config/setting.config'
import { LoginForm, AuthInfo, UserInfo } from '@/api/upms/entity/user'
import { Menu } from '@/api/upms/entity/menu'
import { Tenant } from '@/api/upms/entity/tenant'
import { loginApi } from '@/api/upms/auth'

interface UserState {
  authInfo?: AuthInfo;
  tenant?: Tenant;
  tenantId?: number;
  userInfo?: UserInfo;
  userMenus?: Menu[];
  permissions?: string[];
  roles?: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    authInfo: storageLocal.getItem<AuthInfo>(setting.authInfo),
    tenant: storageLocal.getItem<Tenant>(setting.tenantKey),
    tenantId: storageLocal.getItem<number>(setting.tenant),
    userInfo: {},
    userMenus: storageLocal.getItem<Menu[]>('userMenus'),
    permissions: [],
    roles: []
  }),
  actions: {
    setAuthInfo (authInfo: AuthInfo) {
      this.authInfo = authInfo
      storageLocal.setItem(setting.authInfo, authInfo)
    },
    setTenant (tenant: Tenant) {
      this.tenant = tenant
      storageLocal.setItem(setting.tenantKey, tenant)
    },
    setUserInfo (userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setPermissions (permissions: string[]) {
      const list: any = {}
      permissions.forEach(item => {
        list[item] = true
      })
      this.permissions = list
    },
    setUserMenus (userMenus: Menu[]) {
      this.userMenus = userMenus
      storageLocal.setItem('userMenus', userMenus)
    },
    setRoles (roles: string[]) {
      this.roles = roles
    },
    setTenantId (tenantId: number) {
      if (this.tenant) {
        this.tenant.id = tenantId
      }
      this.tenantId = tenantId
      storageLocal.setItem(setting.tenantKey, this.tenant)
    },

    async login (loginInfo: LoginForm): Promise<AuthInfo | null> {
      try {
        const data = await loginApi(encryption(loginInfo, setting.aesIv, ['password']))
        this.setAuthInfo(data)
        return null
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

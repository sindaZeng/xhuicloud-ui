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
import { Tenant } from '@/api/upms/entity/tenant'
import { loginApi, logout, refreshToken } from '@/api/upms/auth'
import { userInfo } from '@/api/upms/user'
import { cloneDeep } from 'lodash-es'
import useMqtt from '@/hooks/useMqtt'

export interface UserState {
  authInfo: AuthInfo | null
  tenant: Tenant | null
  tenantId?: number
  sysUser: SysUser | null
  permissions: any
  roles?: string[]
}
const defaultUserState = {
  authInfo: null,
  tenant: null,
  sysUser: null,
  permissions: null
} as UserState
const useUserStore = defineStore('user', {
  state: (): UserState => cloneDeep(defaultUserState),
  getters: {
    getSysUser(): SysUser {
      return this.sysUser || storageLocal.getItem<SysUser>(setting.user)
    },
    getToken(): string | undefined {
      return this.authInfo?.access_token || storageLocal.getItem<AuthInfo>(setting.authInfo)?.access_token
    },
    getSessionId(): string | undefined {
      return this.authInfo?.session_id || storageLocal.getItem<AuthInfo>(setting.authInfo)?.session_id
    },
    getRefreshToken(): string {
      return this.authInfo?.refresh_token || storageLocal.getItem<AuthInfo>(setting.authInfo)?.refresh_token
    },
    getTenant(): Tenant {
      return this.tenant || storageLocal.getItem<Tenant>(setting.tenant)
    },
    getTenantId(): number {
      return this.tenant?.id || storageLocal.getItem<Tenant>(setting.tenant)?.id
    },
    getPermissions(): any {
      return this.permissions || storageLocal.getItem<any>(setting.permission)
    }
  },
  actions: {
    setAuthInfo(authInfo: AuthInfo) {
      this.authInfo = authInfo
      storageLocal.setItem(setting.authInfo, authInfo)
    },
    setTenant(tenant: Tenant) {
      this.tenant = tenant
      storageLocal.setItem(setting.tenant, tenant)
    },
    setSysUser(sysUser: SysUser) {
      this.sysUser = sysUser
      storageLocal.setItem(setting.user, sysUser)
    },
    setPermissions(permissions: string[]) {
      const list: any = {}
      permissions.forEach((item) => {
        list[item] = true
      })
      storageLocal.setItem(setting.permission, list)
      this.permissions = list
    },
    setRoles(roles: string[] = []) {
      this.roles = roles
    },
    setTenantId(tenantId: number) {
      if (this.tenant) {
        this.tenant.id = tenantId
      }
      storageLocal.setItem(setting.tenant, this.tenant)
    },
    /**
     * 统一登录入口
     * @param loginInfo
     * @returns
     */
    async login(loginInfo: LoginForm): Promise<UserInfo | null> {
      try {
        const loginInfoEncry = encryption<LoginForm>(loginInfo, setting.aesIv, ['password'])
        const data = await loginApi(loginInfoEncry)
        this.setAuthInfo(data)
        // this.connectMqtt(loginInfoEncry.username, loginInfoEncry.password)
        return this.getUserInfo()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo(): Promise<UserInfo> {
      const res = await userInfo()
      this.setSysUser(res.sysUser)
      this.setPermissions(res.permissions)
      this.setRoles(res.roles)
      return res
    },
    // async connectMqtt(sessionOnline: string) {
    //   useMqtt({
    //     host: `${import.meta.env.VITE_WS_API}`,
    //     port: 15000,
    //     path: `/mqtt?session_online=${sessionOnline}`,
    //     username: username,
    //     password: password,
    //     clientId: this.sysUser?.userId + '@' + this.tenantId
    //   })
    // },
    async refreshToken() {
      return (
        this.authInfo &&
        refreshToken(this.authInfo.refresh_token).then((response) => {
          this.setAuthInfo(response)
          return response
        })
      )
    },
    async logout() {
      await logout()
      await storageLocal.clear()
      await this.$reset()
      const { disconnect } = useMqtt()
      disconnect()
    },
    async reset() {
      await storageLocal.clear()
      await this.$reset()
    }
  }
})

export default useUserStore

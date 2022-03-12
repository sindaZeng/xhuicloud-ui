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

import { login, logout, refreshToken } from '@/api/auth'
import { toRaw } from 'vue'
import { getUserInfo } from '@/api/user'
import { getMenu } from '@/api/menu'
import { setStorage, getStorage, delAllStorage } from '@/utils/storage'
import { tenant, refreshTokenName, tokenName } from '@/config'

const actions = {
  login (context, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm).then(response => {
        this.commit('user/setToken', response.access_token)
        this.commit('user/setRefreshToken', response.refresh_token)
        this.commit('user/setTenantId', response.tenant_id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  async getUserInfo (context) {
    const res = await getUserInfo()
    this.commit('user/setUserInfo', res.sysUser)
    this.commit('user/setPermissions', res.permissions)
    this.commit('user/setRoles', res.roles)
    return res
  },
  logout ({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(response => {
        dispatch('delAnything')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户菜单
  async getMenu (context) {
    const res = toRaw(await getMenu())
    this.commit('user/setUserMenus', res)
    return res
  },
  delAnything (context) {
    this.commit('user/setToken', '')
    this.commit('user/setUserInfo', {})
    this.commit('user/setPermissions', [])
    this.commit('user/setRoles', [])
    this.commit('app/delAllTagViews')
    delAllStorage()
  },
  refreshToken (context) {
    return new Promise((resolve, reject) => {
      refreshToken(state.refreshToken).then(response => {
        this.commit('user/setToken', response.access_token)
        this.commit('user/setRefreshToken', response.refresh_token)
        this.commit('user/setTenantId', response.tenant_id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
    setStorage(tokenName, token)
  },
  setRefreshToken (state, refreshToken) {
    state.refreshToken = refreshToken
    setStorage(refreshTokenName, refreshToken)
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setPermissions (state, permissions) {
    const list = {}
    permissions.forEach(item => {
      list[item] = true
    })
    state.permissions = list
  },
  setUserMenus (state, userMenus) {
    state.userMenus = userMenus
    setStorage('userMenus', userMenus)
  },
  setRoles (state, roles) {
    state.roles = roles
  },
  setTenantId (state, tenantId) {
    state.tenantId = tenantId
    setStorage(tenant, tenantId)
  }
}

const state = {
  token: getStorage(tokenName) || '',
  refreshToken: getStorage(refreshTokenName) || '',
  userInfo: {},
  userMenus: getStorage('userMenus') || [],
  permissions: [],
  roles: [],
  tenantId: getStorage(tenant) || undefined
}

export default {
  actions,
  mutations,
  state
}

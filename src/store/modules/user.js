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

import { login } from '@/api/auth'
import { getUserInfo } from '@/api/user'
import { setStorage, getStorage } from '@/utils/storage'
import { tokenName } from '@/config'
import router from '@/router'

const actions = {
  login (context, loginForm) {
    return new Promise((resolve, reject) => {
      login(loginForm).then(response => {
        this.commit('user/setToken', response.access_token)
        router.push('/')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  async getUserInfo (context) {
    const res = await getUserInfo()
    this.commit('user/setUserInfo', res)
    return res
  }
}

const mutations = {
  setToken (state, token) {
    state.token = token
    setStorage(tokenName, token)
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

const state = {
  token: getStorage(tokenName) || '',
  userInfo: {}
}
export default {
  namespaced: true,
  actions,
  mutations,
  state
}

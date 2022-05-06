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

import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (store.getters.token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    if (store.getters.tenantId) {
      config.headers.tenant_id = store.getters.tenantId
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const status = Number(response.status)
    const { code, msg, data } = response.data
    if (status === 200) {
      if (code === 0) {
        return data
      } else {
        return response.data
      }
    } else {
      ElMessage.error(msg)
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  error => {
    const response = error.response
    const status = response.status
    if (status === 423) {
      ElMessage.error('演示环境不允许操作哦~')
      return Promise.reject(error)
    } else if (status === 503) {
      ElMessage.error('网络开小差啦~')
      return Promise.reject(error)
    } else if (status === 401) {
      store.dispatch('user/delAnything').then(() => {
        window.location.reload()
      })
    }
    ElMessage.error(response.data.msg)
    return Promise.reject(error)
  })
export default request

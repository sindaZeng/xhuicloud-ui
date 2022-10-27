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

import { XhAxios } from './xhAxios'
import useStore from '@/store'
import { AxiosResponse } from 'axios'
import { XhAxiosHandler } from '@/utils/http/xhAxiosHandler'
import { ElMessage } from 'element-plus'

const handler: XhAxiosHandler = {
  requestInterceptors: (config) => {
    const { user } = useStore()
    if ((config as Recordable)?.requestOptions?.withToken !== false && user.getToken) {
      ;(config as Recordable).headers.Authorization = `Bearer ${user.getToken}`
    }
    if (user.getTenantId) {
      ;(config as Recordable).headers.tenant_id = user.getTenantId
    }
    return config
  },
  responseInterceptors: (response: AxiosResponse<any>) => {
    /**
     * 返回原载荷
     */
    if (!Reflect.has(response.data, 'code')) {
      return response.data
    }
    const status = Number(response.status)
    const { code, data, msg } = response.data
    if (status === 200 && code === 0) {
      return data
    } else {
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  requestResultHook: (res: AxiosResponse<API.Response>) => {
    return res
  },
  responseCatchHook: (error: any) => {
    const { response } = error || {}
    const { status, data } = response
    if (status === 423) {
      ElMessage.error('演示环境不允许操作哦~')
      return Promise.reject(error)
    } else if (status === 503) {
      ElMessage.error('网络开小差啦~')
      return Promise.reject(error)
    } else if (status === 401) {
      const { user } = useStore()
      user.cleanAll()
      window.location.reload()
    } else {
      ElMessage.error(data.msg)
    }
    return Promise.reject(error)
  }
}

function createAxios() {
  return new XhAxios({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
    handler
  })
}

export const HttpClient = createAxios()

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
import { user } from '@/store'
import { AxiosResponse } from 'axios'
import { XhAxiosHandler } from '@/utils/http/xhAxiosHandler'

const handler: XhAxiosHandler = {
  requestInterceptors: (config) => {
    if (user.token && config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    if (user.tenantId) {
      (config as Recordable).headers.tenant_id = user.tenantId
    }
    return config
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseHandleHook: (res: AxiosResponse<any>) => {
    return res
  }

}

function createAxios () {
  return new XhAxios({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000,
    handler
  })
}

export const HttpClient = createAxios()

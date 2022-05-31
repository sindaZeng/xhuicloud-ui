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

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import { cloneDeep } from 'lodash-es'
import { RequestOptions, XhAxiosRequestConfig } from '@/utils/http/xhAxiosHandler'
import { isFunction } from '@/utils/is'

const pendingMap = new Map<string, Canceler>()

const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

class AxiosCanceler {
  addPending = (config: AxiosRequestConfig) => {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel)
      }
    })
  }

  /**
   * TODO 切换路由取消请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  removePending = (config: AxiosRequestConfig) => {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }
}

export class XhAxios {
  private axiosInstance: AxiosInstance
  private readonly config: XhAxiosRequestConfig

  constructor(config: XhAxiosRequestConfig) {
    this.config = config
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const { handler } = this.config
    if (!handler) {
      return
    }
    const { requestInterceptors, requestCatchHook, responseInterceptors, responseCatchHook } = handler

    const axiosCanceler = new AxiosCanceler()

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }
      return config
    }, undefined)

    requestCatchHook &&
      isFunction(requestCatchHook) &&
      this.axiosInstance.interceptors.request.use(undefined, requestCatchHook)

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    responseCatchHook &&
      isFunction(responseCatchHook) &&
      this.axiosInstance.interceptors.response.use(undefined, responseCatchHook)
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const { requestResultHook, requestCatchHook } = this.config?.handler || {}
    const conf: XhAxiosRequestConfig = cloneDeep(config)
    const { requestOptions } = this.config
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    conf.requestOptions = opt
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<API.Response>>(conf)
        .then((res: AxiosResponse<API.Response>) => {
          if (requestResultHook && isFunction(requestResultHook)) {
            try {
              const ret = requestResultHook(res)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e))
            return
          }
          if (axios.isAxiosError(e)) {
          }
          reject(e)
        })
    })
  }

  delete<T = any>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      {
        ...config,
        method: 'DELETE'
      },
      options
    )
  }

  get<T = any>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      {
        ...config,
        method: 'GET'
      },
      options
    )
  }

  post<T = any>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      {
        ...config,
        method: 'POST'
      },
      options
    )
  }

  put<T = any>(config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      {
        ...config,
        method: 'PUT'
      },
      options
    )
  }
}

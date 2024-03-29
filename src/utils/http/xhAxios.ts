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
import { isFunction, isNullOrUnDef } from '@/utils/is'
import { ElNotification as $notification } from 'element-plus'
import { UploadFileParams } from '@/api/base'

const pendingMap = new Map<string, Canceler>()

const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

class AxiosCanceler {
  addPending = (config: AxiosRequestConfig) => {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = new axios.CancelToken((cancel: any) => {
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

    this.axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
      response && axiosCanceler.removePending(response.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        response = responseInterceptors(response)
      }
      return response
    }, responseCatchHook)
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
              const { successMsg, titleMsg } = opt
              const ret = requestResultHook(res)
              successMsg &&
                $notification({
                  title: isNullOrUnDef(titleMsg) ? 'Success' : titleMsg,
                  message: successMsg,
                  type: 'success'
                })
              resolve(ret)
            } catch (err) {
              const { errorMsg, titleMsg } = opt
              errorMsg &&
                $notification({
                  title: isNullOrUnDef(errorMsg) ? 'Error' : titleMsg,
                  message: errorMsg,
                  type: 'error'
                })
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

  downloadFile(fileName: string, fileType: string, config?: AxiosRequestConfig, options?: RequestOptions) {
    return this.request(
      {
        ...config
      },
      options
    ).then((response) => {
      const blob = new Blob([response], { type: 'application/zip' })

      fileName = fileName + '.' + fileType
      const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
      const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

      if (/(iP)/g.test(window.navigator.userAgent)) {
        console.error('Your browser does not support download!')
        return
      }
      if (isChrome || isSafari) {
        const link = document.createElement('a')
        link.download = fileName
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      }
    })
  }

  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams): Promise<T> {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }
    return this.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8'
      }
    })
  }
}

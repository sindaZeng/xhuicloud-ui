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

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Response, UploadFile } from '~/axios'
import { XhAxiosRequestConfig } from '@/utils/http/xhAxiosHandler'
import { isFunction } from '@/utils/is'

interface Axios {
  getAxios(): AxiosInstance;
  setHeader(headers: any): void;
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFile): void;
}

export class XhAxios implements Axios {
  private axiosInstance: AxiosInstance;
  private readonly config: XhAxiosRequestConfig;

  constructor (config: XhAxiosRequestConfig) {
    this.config = config
    this.axiosInstance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors () {
    const { handler } = this.config
    if (!handler) {
      return
    }
    const {
      requestInterceptors,
      responseInterceptors
    } = handler
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }
      return config
    }, undefined)

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)
  }

  getAxios (): AxiosInstance {
    return this.axiosInstance
  }

  setHeader (headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  request<T = any> (config: AxiosRequestConfig): Promise<T> {
    const { responseHandle } = this.config?.handler
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Response>>(config)
        .then((res: AxiosResponse<Response>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
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
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            console.log(e)
          }
          reject(e)
        })
    })
  }

  delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  put<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  uploadFile<T = any> (config: AxiosRequestConfig, params: UploadFile) {
    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  }
}

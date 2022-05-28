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

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface XhAxiosRequestConfig extends AxiosRequestConfig {
  authenticationScheme?: string
  handler?: XhAxiosHandler
  requestOptions?: RequestOptions
}

interface RequestOptions {
  /**
   * 这个配置不带上token
   */
  withToken?: boolean
}

export abstract class XhAxiosHandler {
  /**
   * 请求拦截
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig

  /**
   * 响应拦截
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * 响应数据处理
   */
  requestResultHook?: (res: AxiosResponse<API.Response>) => any

  /**
   * 请求失败处理
   */
  requestCatchHook?: (e: Error | AxiosError) => Promise<any>

  /**
   * 请求后失败处理
   */
  responseCatchHook?: (error: any) => void
}

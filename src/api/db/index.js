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

import request from '@/utils/request'

/**
 * 系统参数分页
 * @param query
 * @returns {*}
 */
export const dbPage = query => {
  return request({
    url: '/gen/db/page',
    method: 'get',
    params: query
  })
}

/**
 * 数据库连接测试
 * @param id
 * @returns {*}
 */
export const dbTest = id => {
  return request({
    url: '/gen/db/test/' + id,
    method: 'put'
  })
}

/**
 * 数据库表信息
 * @param id
 * @returns {*}
 */
export const dbInfo = id => {
  return request({
    url: '/gen/db/info/' + id,
    method: 'get'
  })
}

/**
 * 新增数据源
 * @param data
 * @returns {*}
 */
export const createDb = data => {
  return request({
    url: '/gen/db',
    method: 'post',
    data
  })
}

/**
 * 生成代码并下载
 * @param data
 * @returns {*}
 */
export const codeDown = data => {
  return request({
    url: '/gen/generator',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/json; application/octet-stream' },
    responseType: 'arraybuffer'
  }).then(response => {
    const blob = new Blob([response], { type: 'application/zip' })
    const fileName = data.moduleName + '.zip'
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(new Blob([blob]), fileName)
    } else {
      const link = document.createElement('a')
      link.download = fileName
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }
  })
}

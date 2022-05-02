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
* 终端信息分页
* @param query
* @returns {*}
*/
export const clientPage = query => {
  return request({
    url: '/admin/client/page',
    method: 'get',
    params: query
  })
}

/**
* 通过id查询终端信息
* @param data
* @returns {*}
*/
export const getClient = data => {
  return request({
    url: '/admin/client',
    method: 'post',
    data
  })
}

/**
* 新增终端信息
* @param data
* @returns {*}
*/
export const createClient = data => {
  return request({
    url: '/admin/client',
    method: 'post',
    data
  })
}

/**
* 删除终端信息
* @param id
* @returns {*}
*/
export const delClient = id => {
  return request({
    url: '/admin/client/' + id,
    method: 'delete'
  })
}

/**
* 更新终端信息
* @param data
* @returns {*}
*/
export const updateClient = data => {
  return request({
    url: '/admin/client',
    method: 'put',
    data
  })
}

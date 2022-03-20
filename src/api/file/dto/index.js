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

import { parseTime } from '@/utils/date'

export const tableAttributes = {
  enableOperations: true, // 开启操作栏
  columns: [{
    label: 'id',
    prop: 'id'
  }, {
    label: '桶名称',
    prop: 'bucketName'
  }, {
    label: '文件名称',
    prop: 'fileName'
  }, {
    label: '原文件名称',
    prop: 'name'
  }, {
    label: '文件大小',
    prop: 'fileSize'
  }, {
    label: '文件类型',
    prop: 'fileType'
  }, {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    formatter: parseTime,
    valueFormat: 'YYYY-MM-DD HH:mm:ss'
  }]
}

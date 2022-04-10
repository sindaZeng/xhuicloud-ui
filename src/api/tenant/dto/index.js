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
  enableSearch: true, // 开启搜索栏
  enableOperations: true, // 开启操作栏
  operationWidth: '250',
  columns: [{
    label: '租户id',
    prop: 'id',
    editDisabled: true,
    createDisabled: true
  }, {
    label: '租户名称',
    prop: 'name',
    search: {
      placeholder: '请输入用户名称',
      size: 'small'
    }
  }, {
    label: 'logo',
    prop: 'logo',
    type: 'image'
  }, {
    label: '租户状态',
    prop: 'state',
    type: 'select',
    baseData: [{
      value: 0,
      label: '禁用'
    }, {
      value: 1,
      label: '正常'
    }, {
      value: 2,
      label: '待审核'
    }, {
      value: 3,
      label: '拒绝'
    }],
    tagType: row => {
      return row.state === 1 ? 'success' : 'danger'
    },
    valueFormat: row => {
      if (row.state === 0) {
        return '禁用'
      } else if (row.state === 1) {
        return '正常'
      } else if (row.state === 2) {
        return '待审核'
      } else if (row.state === 3) {
        return '拒绝'
      }
    },
    width: 100
  }, {
    label: '有效期',
    prop: 'expirationTime',
    type: 'datetime',
    formatter: parseTime,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    search: {
      placeholder: '请选择有效期',
      size: 'small'
    }
  }, {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    formatter: parseTime,
    editDisplay: true,
    createDisplay: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss'
  }]
}

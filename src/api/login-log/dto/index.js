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
  columns: [{
    label: 'id',
    prop: 'id'
  }, {
    label: '用户名称',
    prop: 'username',
    search: {
      placeholder: '请输入用户名称',
      size: 'small'
    }
  }, {
    label: '用户id',
    prop: 'userId'
  }, {
    label: 'ip',
    prop: 'ip'
  }, {
    label: 'UA',
    prop: 'useragent'
  }, {
    label: '登录状态',
    prop: 'status',
    type: 'tag',
    tagTpye: row => {
      return row.status === 0 ? 'success' : 'danger'
    },
    valueFormat: row => {
      return row.status === 0 ? '登录成功' : '登录失败'
    }
  }, {
    label: '备注',
    prop: 'remake'
  }, {
    label: '登录时间',
    prop: 'loginTime',
    formatter: parseTime,
    valueFormat: 'YYYY-MM-DD HH:mm:ss'
  }]
}

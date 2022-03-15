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
  columns: [{
    label: '用户编号',
    prop: 'userId',
    editDisabled: true,
    createDisabled: true,
    hidden: false
  }, {
    label: '用户名称',
    prop: 'username',
    search: {
      placeholder: '请输入用户名称',
      size: 'small'
    },
    rules: [{
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }]
  }, {
    label: '用户头像',
    prop: 'avatar',
    type: 'image',
    editDisplay: true,
    createDisplay: true
  }, {
    label: '用户邮箱',
    prop: 'email'
  }, {
    label: '用户手机',
    prop: 'phone',
    rules: [{
      required: true,
      message: '请输入用户手机',
      trigger: 'blur'
    }]
  }, {
    label: '用户性别',
    prop: 'sex',
    type: 'radio',
    baseData: [{
      value: '女',
      label: 0
    }, {
      value: '男',
      label: 1
    }],
    rules: [{
      required: true,
      message: '请选择用户性别',
      trigger: 'blur'
    }],
    valueFormat: row => {
      return row.sex === 0 ? '女' : '男'
    }
  }, {
    label: '锁定状态',
    prop: 'lockFlag',
    type: 'radio',
    baseData: [{
      value: '正常',
      label: 0
    }, {
      value: '锁定',
      label: 1
    }],
    tagTpye: row => {
      return row.lockFlag === 0 ? 'success' : 'danger'
    },
    valueFormat: row => {
      return row.lockFlag === 0 ? '正常' : '锁定'
    },
    width: 100
  }, {
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    formatter: parseTime,
    editDisplay: true,
    createDisplay: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    search: {
      placeholder: '请选择创建时间',
      size: 'small'
    }
  }]
}

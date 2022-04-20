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
  operationWidth: '280',
  columns: [{
    label: 'id',
    prop: 'id',
    editDisabled: true,
    createDisabled: true
  }, {
    label: '数据库名称',
    prop: 'name',
    search: {
      placeholder: '请输入数据库名称',
      size: 'small'
    }
  }, {
    label: '数据库用户名',
    prop: 'username'
  }, {
    label: '数据库密码',
    prop: 'password',
    type: 'password'
  }, {
    label: '数据库主机',
    prop: 'host'
  }, {
    label: '数据库端口',
    prop: 'port'
  }, {
    label: '数据库类型',
    prop: 'type',
    type: 'select',
    baseData: [{
      value: 'mysql',
      label: 'mysql'
    }, {
      value: 'pg',
      label: 'postgresql'
    }, {
      value: 'mssql',
      label: 'sqlserver'
    }, {
      value: 'oracle',
      label: 'oracle'
    }, {
      value: 'db2',
      label: 'db2'
    }]
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

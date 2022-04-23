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
  columns: [
    {
      label: '编号',
      prop: 'id'
    },
    {
      label: '操作IP',
      prop: 'requestIp'
    },
    {
      label: '操作人',
      prop: 'userName'
    },
    {
      label: '操作描述',
      prop: 'description'
    },
    {
      label: '类路径',
      prop: 'classPath'
    },
    {
      label: '请求方法',
      prop: 'requestMethod'
    },
    {
      label: '请求地址',
      prop: 'requestUri'
    },
    {
      label: '请求类型',
      prop: 'httpMethod'
    },
    {
      label: '请求参数',
      prop: 'params'
    },
    {
      label: '返回值',
      prop: 'result'
    },
    {
      label: '异常详情信息',
      prop: 'exDesc'
    },
    {
      label: '异常描述',
      prop: 'exDetail'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      formatter: parseTime,
      editDisplay: true,
      createDisplay: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      label: '结束时间',
      prop: 'finishTime',
      type: 'datetime',
      formatter: parseTime,
      editDisplay: true,
      createDisplay: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      label: '执行时间',
      prop: 'time'
    },
    {
      label: '浏览器',
      prop: 'userAgent'
    }
  ]
}

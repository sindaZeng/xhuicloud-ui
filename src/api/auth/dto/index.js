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
export const tableAttributes = {
  enableSearch: true, // 开启搜索栏 字段得添加可搜索属性!
  enableOperations: true, // 开启操作栏
  operationWidth: '250',
  columns: [
    {
      label: '部门id',
      prop: 'id',
      editDisabled: true,
      createDisabled: true
    },
    {
      label: '部门名称',
      prop: 'name'
    },
    {
      label: '区域、地址、工位',
      prop: 'address'
    },
    {
      label: '上级ID',
      prop: 'parentId'
    },
    {
      label: '排序',
      prop: 'sort'
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
      label: '创建者id',
      prop: 'createId'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      type: 'datetime',
      formatter: parseTime,
      editDisplay: true,
      createDisplay: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    {
      label: '更新者id',
      prop: 'updateId'
    },
    {
      label: '租户id',
      prop: 'tenantId'
    },
    {
      label: '0: 否 1：是',
      prop: 'isDel'
    }
  ]
}

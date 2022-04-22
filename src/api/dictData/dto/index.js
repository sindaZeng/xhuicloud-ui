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
  enableOperations: true, // 开启操作栏
  operationWidth: '200',
  columns: [
    {
      label: '字典数据id',
      prop: 'id',
      editDisabled: true,
      createDisabled: true
    },
    {
      label: '字典项id',
      prop: 'dictId',
      editDisabled: true,
      createDisabled: true
    },
    {
      label: '字典项名称',
      prop: 'type'
    },
    {
      label: '字典标签',
      prop: 'label'
    },
    {
      label: '字典键值',
      prop: 'value'
    },
    {
      label: '字典描述',
      prop: 'description'
    },
    {
      label: '备注',
      prop: 'remarks'
    }
  ]
}

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
  stripe: true, // 斑马纹表格
  height: 680, // 表格高度
  columns: [{
    label: '名称',
    prop: 'name'
  }, {
    label: '图标',
    prop: 'icon',
    type: 'icon'
  }, {
    label: '国际化',
    prop: 'internationalization'
  }, {
    label: '类型',
    prop: 'type',
    type: 'radio',
    baseData: [{
      value: '菜单',
      label: 0
    }, {
      value: '按钮',
      label: 1
    }],
    tagType: row => {
      return row.type === 0 ? 'success' : ''
    },
    valueFormat: row => {
      return row.type === 0 ? '菜单' : '按钮'
    }
  }, {
    label: '路由路径',
    prop: 'path'
  }, {
    label: '授权标识',
    prop: 'permission'
  }, {
    label: '排序',
    prop: 'sort'
  }]
}

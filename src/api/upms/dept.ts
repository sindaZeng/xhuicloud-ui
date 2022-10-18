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

import { HttpClient } from '@/utils/http'
import { Page } from '../base'

enum DeptApi {
  DeptTree = '/admin/dept/tree',
  DeptPage = '/admin/dept/page',
  CreateDept = '/admin/dept',
  UpdateDept = '/admin/dept',
  DeleteDept = '/admin/dept/'
}

export function deptTree(params?: any) {
  return HttpClient.get<Array<Dept>>({ url: DeptApi.DeptTree, params })
}

export function deptPage(params: any) {
  return HttpClient.get<Page<SysDept>>({
    url: DeptApi.DeptPage,
    params
  })
}

export function createDept(data: SysDept) {
  return HttpClient.post<number>(
    {
      url: DeptApi.CreateDept,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '部门添加成功'
    }
  )
}

export function updateDept(data: SysDept) {
  return HttpClient.put<boolean>(
    {
      url: DeptApi.UpdateDept,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '部门修改成功'
    }
  )
}

export function deleteDept(deptId: number) {
  return HttpClient.delete<boolean>(
    {
      url: DeptApi.DeleteDept + deptId
    },
    {
      titleMsg: '操作成功',
      successMsg: '部门删除成功'
    }
  )
}

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

enum MenuApi {
  Menu = '/admin/menu',
  MenuTree = '/admin/menu/tree',
  MenuTreeByRole = '/admin/menu/tree/',
  CreateMenu = '/admin/menu',
  UpdateMenu = '/admin/menu',
  DeleteMenu = '/admin/menu/'
}

export function menu() {
  return HttpClient.get<Menu[]>({ url: MenuApi.Menu })
}

/**
 * 菜单树
 * @param disabled
 * @returns {*}
 */
export function menuTree(disabled: boolean) {
  return HttpClient.get<Menu[]>({ url: MenuApi.MenuTree, params: { disabled } })
}

export function menuTreeByRole(roleId: number) {
  return HttpClient.get<number[]>({ url: MenuApi.MenuTreeByRole + roleId })
}

export function createMenu(data: Menu) {
  return HttpClient.post<number>(
    {
      url: MenuApi.CreateMenu,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '菜单添加成功'
    }
  )
}

export function updateMenu(data: Menu) {
  return HttpClient.put<boolean>(
    {
      url: MenuApi.UpdateMenu,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '菜单修改成功'
    }
  )
}

export function deleteMenu(id: number) {
  return HttpClient.delete<boolean>(
    {
      url: MenuApi.DeleteMenu + id
    },
    {
      titleMsg: '操作成功',
      successMsg: '菜单删除成功'
    }
  )
}

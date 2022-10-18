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

enum RoleApi {
  RoleList = '/admin/role/list',
  RolePage = '/admin/role/page',
  CreateRole = '/admin/role',
  UpdateRole = '/admin/role',
  UpdateRoleMenus = '/admin/role/menus',
  DeleteRole = '/admin/role/'
}

export function rolesList() {
  return HttpClient.get<RoleDto[]>({ url: RoleApi.RoleList })
}

export function rolesPage(params: any) {
  return HttpClient.get<Page<SysRole>>({
    url: RoleApi.RolePage,
    params
  })
}

export function createRole(data: SysRole) {
  return HttpClient.post<boolean>(
    {
      url: RoleApi.CreateRole,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '角色添加成功'
    }
  )
}

export function updateRole(data: SysRole) {
  return HttpClient.put<boolean>(
    {
      url: RoleApi.UpdateRole,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '角色修改成功'
    }
  )
}

export function deleteRole(roleId: number) {
  return HttpClient.delete<boolean>(
    {
      url: RoleApi.DeleteRole + roleId
    },
    {
      titleMsg: '操作成功',
      successMsg: '角色删除成功'
    }
  )
}

export function updateRoleMenus(data: RoleMenusDto) {
  return HttpClient.put<boolean>(
    {
      url: RoleApi.UpdateRoleMenus,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '角色权限修改成功'
    }
  )
}

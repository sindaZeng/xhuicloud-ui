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

import request from '@/utils/request'

/**
 * 角色分页
 * @param query
 * @returns {*}
 */
export const rolesPage = query => {
  return request({
    url: '/admin/role/page',
    method: 'get',
    params: query
  })
}

/**
 * 新增角色
 * @param data
 * @returns {*}
 */
export const createRole = data => {
  return request({
    url: '/admin/role',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 * @param id
 * @returns {*}
 */
export const delRole = id => {
  return request({
    url: '/admin/role/' + id,
    method: 'delete'
  })
}

/**
 * 更新角色
 * @param data
 * @returns {*}
 */
export const updateRole = data => {
  return request({
    url: 'admin/role/',
    method: 'put',
    data
  })
}

/**
 * 更新角色菜单
 * @param roleId
 * @param menuIds
 * @returns {*}
 */
export const updateRoleMenus = (roleId, menuIds) => {
  return request({
    url: 'admin/role/menus',
    method: 'post',
    params: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

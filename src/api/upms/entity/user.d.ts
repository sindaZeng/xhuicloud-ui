/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the Software), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

interface LoginForm {
  username?: string
  password?: string
  code?: string
  platform?: string
  grant_type: string
  scope: string
}

interface AuthInfo {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  tenant_id: number
  id: number
  tenantName: string
  phone: string
}

interface SysUser {
  userId?: number
  username?: string
  avatar?: string
  phone?: string
  motto?: string
  email?: string
  sex?: number
  tenantId?: number
}

interface UserInfo {
  sysUser: SysUser
  permissions: string[]
  roles?: []
  tenantName?: string
}

interface UserInfoReqDto {
  motto?: string
  avatar?: string
}

interface UserVo {
  userId: number
  username: string
  avatar?: string
  phone: string
  email?: string
  sex: number
  createTime: string
  updateTime: string
  lockFlag: number
  isDel: number
  roleVos: RoleVo[]
  deptVos: DeptVo[]
}

interface DeptVo {
  deptId: number
  deptName: string
}

interface RoleVo {
  roleId: number
  roleName: string
}

interface SysUser {
  avatar?: string
  deptIds?: number[]
  email?: string
  isDel?: number
  lockFlag?: number
  password?: string
  phone?: string
  roleIds?: number[]
  sex?: number
  tenantId?: number
  updateTime?: string
  userId?: number
  username?: string
}

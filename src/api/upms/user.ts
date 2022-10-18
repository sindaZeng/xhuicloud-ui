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

enum UserApi {
  UserInfo = '/admin/user/info',
  UserPage = '/admin/user/page',
  CreateUser = '/admin/user',
  UpdateUser = '/admin/user',
  UpdateUserMotto = '/admin/user/motto',
  UpdateUserAvatar = '/admin/user/avatar',
  UpdateUserPhone = '/admin/user/phone/',
  DeleteUser = '/admin/user/'
}

export function userInfo() {
  return HttpClient.get<UserInfo>({
    url: UserApi.UserInfo
  })
}

export function userPage(params: any) {
  return HttpClient.get<Page<UserVo>>({
    url: UserApi.UserPage,
    params
  })
}

export function createUser(data: SysUser) {
  return HttpClient.post<number>(
    {
      url: UserApi.CreateUser,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '用户添加成功'
    }
  )
}

export function updateUser(data: SysUser) {
  return HttpClient.put<boolean>(
    {
      url: UserApi.UpdateUser,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '用户修改成功'
    }
  )
}

export function updateUserMotto(data: SysUser) {
  return HttpClient.put<boolean>({
    url: UserApi.UpdateUserMotto,
    data
  })
}

export function updateUserAvatar(data: SysUser) {
  return HttpClient.put<boolean>({
    url: UserApi.UpdateUserAvatar,
    data
  })
}

export function updateUserPhone(phone: string) {
  return HttpClient.put<boolean>({
    url: UserApi.UpdateUserPhone + phone
  })
}

export function deleteUser(userId: number) {
  return HttpClient.delete<boolean>(
    {
      url: UserApi.DeleteUser + userId
    },
    {
      titleMsg: '操作成功',
      successMsg: '用户删除成功'
    }
  )
}

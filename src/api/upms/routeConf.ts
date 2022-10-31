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

enum routeConfApi {
  routeConfPage = '/admin/route/page',
  CreateRouteConf = '/admin/route',
  UpdateRouteConf = '/admin/route',
  DeleteRouteConf = '/admin/route/',
  GetPredicatesById = '/admin/route/getPredicatesById/'
}

export function routeConfsPage(params: any) {
  return HttpClient.get<Page<SysRouteConf>>({
    url: routeConfApi.routeConfPage,
    params
  })
}

export function createrouteConf(data: SysRouteConf) {
  return HttpClient.post<boolean>(
    {
      url: routeConfApi.CreateRouteConf,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '添加成功'
    }
  )
}

export function updaterouteConf(data: any) {
  return HttpClient.put<boolean>(
    {
      url: routeConfApi.UpdateRouteConf,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '修改成功'
    }
  )
}

export function deleterouteConf(routeConfId: number) {
  return HttpClient.delete<boolean>(
    {
      url: routeConfApi.DeleteRouteConf + routeConfId
    },
    {
      titleMsg: '操作成功',
      successMsg: '删除成功'
    }
  )
}

export function getPredicatesById(routeConfId: number) {
  return HttpClient.get<Array<PredicateVo>>({
    url: routeConfApi.GetPredicatesById + routeConfId
  })
}

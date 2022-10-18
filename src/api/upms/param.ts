import { HttpClient } from '@/utils/http'
import { Page } from '../base'

enum ParamApi {
  ParamTree = '/admin/param/tree',
  ParamPage = '/admin/param/page',
  CreateParam = '/admin/param',
  UpdateParam = '/admin/param',
  DeleteParam = '/admin/param/'
}

export function paramTree(params?: any) {
  return HttpClient.get<Array<SysParam>>({ url: ParamApi.ParamTree, params })
}

export function paramPage(params: any) {
  return HttpClient.get<Page<SysParam>>({
    url: ParamApi.ParamPage,
    params
  })
}

export function createParam(data: SysParam) {
  return HttpClient.post<number>(
    {
      url: ParamApi.CreateParam,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '系统参数添加成功'
    }
  )
}

export function updateParam(data: SysParam) {
  return HttpClient.put<boolean>(
    {
      url: ParamApi.UpdateParam,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '系统参数修改成功'
    }
  )
}

export function deleteParam(paramId: number) {
  return HttpClient.delete<boolean>(
    {
      url: ParamApi.DeleteParam + paramId
    },
    {
      titleMsg: '操作成功',
      successMsg: '系统参数删除成功'
    }
  )
}

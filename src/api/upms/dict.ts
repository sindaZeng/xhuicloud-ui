import { HttpClient } from '@/utils/http'
import { Page } from '../base'

enum DictApi {
  DictPage = '/admin/dict/page',
  CreateDict = '/admin/dict',
  UpdateDict = '/admin/dict',
  DeleteDict = '/admin/dict/'
}

export function dictPage(params: any) {
  return HttpClient.get<Page<SysDict>>({
    url: DictApi.DictPage,
    params
  })
}

export function createDict(data: SysDict) {
  return HttpClient.post<number>(
    {
      url: DictApi.CreateDict,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典项添加成功'
    }
  )
}

export function updateDict(data: SysDict) {
  return HttpClient.put<boolean>(
    {
      url: DictApi.UpdateDict,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典项修改成功'
    }
  )
}

export function deleteDict(id: number) {
  return HttpClient.delete<boolean>(
    {
      url: DictApi.DeleteDict + id
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典项删除成功'
    }
  )
}

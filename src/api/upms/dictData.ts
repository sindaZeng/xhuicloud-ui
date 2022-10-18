import { HttpClient } from '@/utils/http'
import { Page } from '../base'

enum DictApi {
  DictDataPage = '/admin/dictData/page',
  CreateDictData = '/admin/dictData',
  UpdateDictData = '/admin/dictData',
  DeleteDictData = '/admin/dictData/'
}

export function dictDataPage(params: any) {
  return HttpClient.get<Page<SysDictData>>({
    url: DictApi.DictDataPage,
    params
  })
}

export function createDictData(data: SysDictData) {
  return HttpClient.post<number>(
    {
      url: DictApi.CreateDictData,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典添加成功'
    }
  )
}

export function updateDictData(data: SysDictData) {
  return HttpClient.put<boolean>(
    {
      url: DictApi.UpdateDictData,
      data
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典修改成功'
    }
  )
}

export function deleteDictData(id: number) {
  return HttpClient.delete<boolean>(
    {
      url: DictApi.DeleteDictData + id
    },
    {
      titleMsg: '操作成功',
      successMsg: '字典删除成功'
    }
  )
}

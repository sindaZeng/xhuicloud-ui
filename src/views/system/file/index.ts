import { TableColumn } from '@/components/XhTable/crud'

export const fileTableColumn: TableColumn[] = [
  {
    label: 'id',
    prop: 'id'
  },
  {
    label: '桶名称',
    prop: 'bucketName',
    searchForm: {}
  },
  {
    label: '文件名称',
    prop: 'fileName',
    searchForm: {}
  },
  {
    label: '原文件名称',
    prop: 'name'
  },
  {
    label: '文件大小',
    prop: 'fileSize'
  },
  {
    label: '文件类型',
    prop: 'fileType'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

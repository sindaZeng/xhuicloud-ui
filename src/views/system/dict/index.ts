import { TableColumn } from '@/components/XhTable/crud'

export const dictTableColumn: TableColumn[] = [
  {
    label: '字典项主键',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {},
    searchForm: {}
  },
  {
    label: '字典项类型',
    prop: 'type',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典项类型',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '字典项描述',
    prop: 'description',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典项描述',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '字典项备注',
    prop: 'remark',
    operationForm: {}
  },
  {
    label: '创建时间',
    prop: 'createTime'
  }
]

export const dictDataTableColumn: TableColumn[] = [
  {
    label: '字典数据id',
    prop: 'id',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '字典项id',
    prop: 'dictId',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '字典项名称',
    prop: 'type',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典项名称',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '字典标签',
    prop: 'label',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典标签',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '字典键值',
    prop: 'value',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典键值',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '字典描述',
    prop: 'description',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入字典描述',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '备注',
    prop: 'remarks',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入备注',
          trigger: 'blur'
        }
      ]
    }
  }
]

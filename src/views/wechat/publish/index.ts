export const tableColumn: TableColumn[] = [
  {
    label: '用户编号',
    prop: 'userId',
    createDisplay: true,
    editDisabled: true,
    operationForm: {}
  },
  {
    label: '用户名称',
    prop: 'username',
    searchForm: {
      componentProps: { placeholder: '用户名称/手机号/邮箱' }
    },
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '用户头像',
    prop: 'avatar',
    image: true
  },
  {
    label: '用户邮箱',
    prop: 'email',
    operationForm: {
      rules: [
        {
          required: true,
          message: '请输入用户邮箱',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '用户手机',
    prop: 'phone',
    operationForm: {
      componentProps: {
        maxlength: 11,
        showWordLimit: true
      },
      rules: [
        {
          required: true,
          message: '请输入用户手机',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]*$/,
          message: '用户手机需为数字',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '用户性别',
    prop: 'sex',
    tag: true,
    operationForm: {
      component: 'RadioButtonGroup',
      componentProps: {
        options: userSex
      },
      rules: [
        {
          required: true,
          message: '请选择用户性别',
          trigger: 'blur'
        }
      ]
    },
    valueFormat: (row: UserVo) => {
      return userSex.find((x) => x.label === row.sex)?.value
    }
  },
  {
    label: '用户部门',
    prop: 'deptIds',
    isFormItem: true,
    operationForm: {
      rules: [
        {
          required: true,
          message: '请选择用户部门',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '用户角色',
    prop: 'roleIds',
    isFormItem: true,
    operationForm: {
      rules: [
        {
          required: true,
          message: '请选择用户角色',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '角色名称',
    prop: 'roleName',
    isFormItem: true,
    searchForm: {
      componentProps: { placeholder: '请输入角色名称' }
    }
  },
  {
    label: '锁定状态',
    prop: 'lockFlag',
    tag: true,
    operationForm: {
      component: 'RadioButtonGroup',
      componentProps: {
        options: userLockFlag
      }
    },
    valueFormat: (row: UserVo) => {
      return row.lockFlag === 0 ? '正常' : '锁定'
    }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    createDisplay: true,
    editDisplay: true,
    searchForm: {
      component: 'ElDatePicker',
      componentProps: {
        type: 'daterange',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '请选择开始日期',
        endPlaceholder: '请选择结束日期'
      }
    }
  }
]

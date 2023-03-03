<template>
  <xh-card class="home-card">
    <template #header>
      <span class="home-card-header-icon"></span>
      <span class="home-card-header-text">我的信息</span>
    </template>
    <div class="home-card-wrap">
      <el-upload
        class="avatar-uploader"
        :before-upload="beforeUpload"
        :action="action"
        :headers="headers"
        :on-success="onSuccess"
        :show-file-list="false"
      >
        <el-avatar v-if="userInfo.avatar" size="large" :src="userInfo.avatar" class="home-avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <div class="home-card-tips">
        <div class="home-card-tips-msg">
          <p class="home-card-tips-username">{{ user.getSysUser.username }}</p>
          <xh-svg :icon="userSexIcon" :width="`1.5em`" :height="`1.5em`"></xh-svg>
          <span class="home-card-tips-tenantName">{{ user.getTenant.name }}</span>
          <span class="home-card-tips-to-update" @click="handleToUpdate(schemas)">修改资料</span>
        </div>
        <p>
          <el-input
            v-model="userInfo.motto"
            class="home-card-tips-user-motto"
            placeholder="暂无个性签"
            @blur="handleToDpdateUserMotto"
          />
        </p>
      </div>
    </div>
    <el-divider />
    <div class="home-card-user-safe">
      <xh-svg icon="security" width="2em" height="2em"></xh-svg>
      <span class="security-title">账号安全</span>
      <div style="width: 900px; overflow: hidden">
        <div class="safe-item">
          <div class="safe-item-icon">
            <xh-svg icon="mobile"></xh-svg>
          </div>
          <div class="safe-item-msg">
            <p class="safe-item-msg-title">我的手机</p>
            <p class="safe-item-msg-desc">绑定手机后即可使用手机号登录</p>
            <span v-if="userInfo.phone" class="safe-item-msg-nobtn">已绑定</span>
            <span v-else class="safe-item-msg-nobtn" @click="handleUpdatePhone(2)">去绑定</span>
            <span v-if="!isEmpty(userInfo.phone)" class="safe-item-msg-a" @click="handleUpdatePhone(1)"
              >更改手机&gt;</span
            >
          </div>
        </div>
        <div class="safe-item">
          <div class="safe-item-icon">
            <xh-svg icon="email"></xh-svg>
          </div>
          <div class="safe-item-msg">
            <p class="safe-item-msg-title">我的邮箱</p>
            <p class="safe-item-msg-desc">绑定邮箱后即可使用邮箱登录</p>
            <span v-if="userInfo.email" class="safe-item-msg-nobtn">已绑定</span>
            <span v-else class="safe-item-msg-nobtn" @click="handleUpdateEmail(2)">去绑定</span>
            <span v-if="!isEmpty(userInfo.email)" class="safe-item-msg-a" @click="handleUpdateEmail(1)"
              >更改邮箱&gt;</span
            >
          </div>
        </div>
        <div class="safe-item">
          <div class="safe-item-icon">
            <xh-svg icon="idcard"></xh-svg>
          </div>
          <div class="safe-item-msg">
            <p class="safe-item-msg-title">设置密码</p>
            <p class="safe-item-msg-desc">可用于账号密码登录</p>
            <span class="safe-item-msg-nobtn">更改密码</span>
          </div>
        </div>
        <div class="safe-item">
          <div class="safe-item-icon">
            <xh-svg icon="idcard"></xh-svg>
          </div>
          <div class="safe-item-msg">
            <p class="safe-item-msg-title">实名认证</p>
            <p class="safe-item-msg-desc">实名认证成功后,可享受XXXX功能</p>
            <span class="safe-item-msg-nobtn">已实名</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="50%"
      :append-to-body="true"
      :before-close="closeDialog"
    >
      <xh-form v-if="dialogComponent === 0" v-bind="userInfoForm" ref="userInfoFormRef" v-model:model="userInfo">
      </xh-form>
      <update-phone v-if="dialogComponent === 1" v-bind="userBindProps"></update-phone>
      <template v-if="dialogComponent === 0" #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">Cancel</el-button>
          <el-button type="primary" @click="toSubmit">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </xh-card>
</template>
<script lang="ts" setup>
  import { updateUser, updateUserAvatar, updateUserMotto } from '@/api/upms/user'
  import UpdatePhone from '@/views/security/userBind.vue'
  import { FormProps } from '@/components/XhForm/form'
  import { FormItem } from '@/components/XhForm/form-item'
  import { XhFormInstance } from '@/components/XhForm/hooks'
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import useStore from '@/store'
  import { isEmpty } from '@/utils/is'
  import { computed, reactive, ref, unref } from 'vue'
  import { userSex } from '.'
  import { UserBindProps } from '@/views/security/userBind'
  const { user } = useStore()
  const userInfo = ref<SysUserInfo>({} as SysUserInfo)

  const dialogVisible = ref<boolean>(false)
  const dialogTitle = ref<string>('')
  const dialogComponent = ref<number>(0)

  const validatePhone = (params: string) => {
    var phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
    if (!phonereg.test(params)) {
      return '请输入正确的手机号码'
    }
    return true
  }

  const userBindProps = reactive<UserBindProps>({
    updateModel: '',
    updateProp: '',
    active: 1,
    validate: validatePhone
  })

  const schemas = [
    {
      label: '用户性别',
      prop: 'sex',
      component: 'RadioButtonGroup',
      componentProps: {
        options: userSex
      }
    },
    {
      label: '用户名称',
      prop: 'username',
      rules: [
        {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '个性签名',
      prop: 'motto',
      componentProps: { type: 'textarea', autosize: true },
      col: { xl: 24, lg: 24 }
    }
  ] as FormItem[]

  const { headers, action, beforeUpload, pathPrefix } = useUploadFiles({})

  const userSexIcon = computed(() => {
    let icon = 'gender'
    if (unref(userInfo).sex === 1) {
      icon = 'man'
    } else if (unref(userInfo).sex === 0) {
      icon = 'woman'
    }
    return icon
  })

  const userInfoFormRef = ref<XhFormInstance>()

  const userInfoForm = reactive<FormProps>({
    schemas: [],
    size: 'default',
    labelPosition: 'right',
    inline: true,
    inlineMessage: false,
    statusIcon: false,
    showMessage: true,
    disabled: false,
    validateOnRuleChange: false,
    hideRequiredAsterisk: false
  })

  const onload = async () => {
    const response = await user.getUserInfo()
    userInfo.value = response.sysUser
  }

  onload()

  const handleToUpdate = (schemas: FormItem[]) => {
    userInfoForm.schemas = schemas
    dialogVisible.value = true
    dialogTitle.value = '用户资料'
  }

  const handleUpdatePhone = (active: number) => {
    userBindProps.active = active
    userBindProps.updateProp = '手机'
    dialogTitle.value = '更换手机'
    userBindProps.updateModel = user.getSysUser.phone!
    dialogComponent.value = 1
    dialogVisible.value = true
  }

  /**
   * todo 邮箱验证码尚未实现
   * @param active
   */
  const handleUpdateEmail = (active: number) => {
    userBindProps.active = active
    userBindProps.updateProp = '邮箱'
    userBindProps.updateModel = user.getSysUser.email!
    dialogTitle.value = '更换邮箱'
    dialogComponent.value = 1
    dialogVisible.value = true
  }

  const handleToDpdateUserMotto = () => {
    updateUserMotto(unref(userInfo))
  }

  const onSuccess = (response: any) => {
    userInfo.value.avatar = pathPrefix + response.data
    updateUserAvatar(unref(userInfo))
  }

  const closeDialog = () => {
    dialogVisible.value = false
    dialogComponent.value = 2
    user.getUserInfo()
  }

  const toSubmit = () => {
    userInfoFormRef.value?.validate?.((valid) => {
      if (valid) {
        updateUser(unref(userInfo)).then(() => {
          onload()
        })
        closeDialog()
      }
    })
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/home.scss';

  .safe-item {
    width: 400px;
    float: left;
    margin: 24px 22px 10px 0;
    display: flex;
    align-items: center;
  }

  .safe-item-msg {
    margin-left: 16px;
    display: inline-block;
    vertical-align: top;

    &-title {
      font-size: 16px;
      color: #222;
      margin-bottom: 6px;
    }
    &-desc {
      font-size: 12px;
      color: #99a2aa;
      margin-bottom: 6px;
    }
    &-a {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      color: #00a1d6;
      margin-left: 10px;
    }
    &-nobtn {
      cursor: pointer;
      background-color: #22a1d6;
      color: #fff;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      width: 70px;
      height: 24px;
      line-height: 24px;
    }
  }
  .safe-item-icon {
    width: 60px;
    height: 60px;
    background: rgb(64, 158, 255);
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2em;
      height: 2em;
    }
  }
  .home-card-user-safe {
    display: inline-block;
    position: relative;
  }
  .security-title {
    font-size: 20px;
    color: #222;
    margin-left: 6px;
    vertical-align: top;
  }
  .home-card-header-icon {
    float: left;
    margin-top: 0px;
    width: 4px;
    height: 30px;
    background-color: #00a1d6;
    border-radius: 4px;
  }

  .home-card-header-text {
    float: left;
    margin: 5px 0 10px 5px;
    color: #00a1d6;
    font-size: 14px;
    cursor: default;
  }
  .home-avatar {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 50%;
  }

  .home-card-tips-user-motto {
    width: 80%;
    margin-left: -10px;
    ::v-deep(.el-input__wrapper) {
      box-shadow: none;
      &:hover {
        box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset !important;
      }
    }
  }
  ::v-deep(.el-textarea) {
    width: 36vw;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
  }
</style>

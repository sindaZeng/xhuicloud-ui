<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->

<template>
  <el-form ref="loginFormRef" class="login-form" :model="loginInfo" :rules="loginRules">
    <el-form-item prop="username">
      <el-input v-model="loginInfo.username" :placeholder="$t(`msg.inputUserName`)" name="username" type="text">
        <template #prefix>
          <el-icon class="el-input__icon">
            <span class="svg-container">
              <xh-svg icon="user" />
            </span>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginInfo.password"
        :placeholder="$t(`msg.inputPassword`)"
        name="password"
        :type="passwordType"
        show-password
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <span class="svg-container">
              <xh-svg icon="password" />
            </span>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <Verify
        ref="verify"
        mode="pop"
        captcha-type="blockPuzzle"
        :img-size="{ width: '330px', height: '155px' }"
        @success="verifySuccess"
      />
    </el-form-item>
    <el-button
      type="primary"
      style="width: 100%; margin-bottom: 30px"
      :loading-icon="Eleme"
      :loading="loading"
      @click="handleLogin(loginFormRef)"
      >{{ $t('msg.login') }}
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue'
  import setting from '@/config/setting.config'
  import { useRouter } from 'vue-router'
  import { validatePassword } from '@/utils/rules'
  import { isNullOrUnDef } from '@/utils/is'
  import type { FormInstance } from 'element-plus'
  import { global } from '@/i18n'
  import useStore from '@/store'
  import { Eleme } from '@element-plus/icons-vue'

  const emit = defineEmits(['tenantWarn'])

  const router = useRouter()

  const { user } = useStore()

  const loginInfo = ref<LoginForm>({
    username: 'admin',
    password: '123456',
    grant_type: 'password',
    scope: 'server'
  })

  const loginRules = ref({
    username: [
      {
        required: true,
        trigger: 'blur',
        message: global.t('msg.usernameNotNull')
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: validatePassword()
      }
    ]
  })

  const passwordType = ref('password')

  const loading = ref(false)
  const verify = ref()

  const loginFormRef = ref<FormInstance>()

  const verifySuccess = (params: any) => {
    loginInfo.value.code = params.captchaVerification
    loginByUsername().catch(() => (loading.value = false))
  }

  const loginByUsername = () => {
    return user.login(loginInfo.value).then((res) => {
      router.push('/')
      return res
    })
  }

  const handleLogin = (form: FormInstance | undefined) => {
    loading.value = true
    if (!form) return
    form.validate((valid) => {
      if (isNullOrUnDef(user.getTenantId)) {
        emit('tenantWarn', true)
        valid = false
        loading.value = false
      }
      if (valid) {
        if (setting.captchaEnable) {
          // 开启验证码的话 先展示验证码,校验成功回调处作登录操作
          verify.value.show()
        } else {
          loginByUsername()
        }
      }
    })
  }
</script>

<style lang="scss" scoped>
  $dark_gray: #889aa4;
  $light_gray: black;
  $cursor: black;

  .login-form {
    .el-button {
      height: 45px;
    }

    .el-input {
      --el-input-bg-color: transparent;
    }
    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    ::v-deep(.el-input) {
      height: 47px;
      input {
        background-color: transparent;
        border: none;
        width: 100%;
        border-radius: 0px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }

    .svg-container {
      padding: 6px 15px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      font-size: 16px;
      color: $dark_gray;
      caret-color: $cursor;
    }
  }
</style>

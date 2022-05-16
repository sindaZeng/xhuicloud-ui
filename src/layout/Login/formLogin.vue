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
  <el-form ref='loginFormRef' class='login-form' :model='loginInfo' :rules='loginRules'>
    <el-form-item prop='username'>
      <el-input :placeholder='$t(`msg.inputUserName`)' name='username' type='text'
                v-model='loginInfo.username'>
        <template #prefix>
          <el-icon class='el-input__icon'>
            <span class='svg-container'>
              <xh-svg icon='user' />
            </span>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop='password'>

      <el-input :placeholder='$t(`msg.inputPassword`)' name='password' :type='passwordType'
                v-model='loginInfo.password'>
        <template #prefix>
          <el-icon class='el-input__icon'>
            <span class='svg-container'>
              <xh-svg icon='password' />
            </span>
          </el-icon>
        </template>
        <template #suffix>
          <el-icon class='el-input__icon'>
            <span class='show-pwd' @click='onchangePasswordType()'>
              <xh-svg :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-button type='primary'
               style='width: 100%; margin-bottom: 30px'
               :loading='loading'
               @click='handleLogin(loginFormRef)'>{{ $t('msg.login') }}
    </el-button>
  </el-form>
</template>

<script lang='ts' setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { validatePassword } from '@/utils/rules'
import { isNullOrUnDef } from '@/utils/is'
import { LoginForm } from '@/api/upms/entity/user'
import type { FormInstance } from 'element-plus'
import i18n from '@/i18n'
import useStore from '@/store'

const emit = defineEmits(['tenantWarn'])

const router = useRouter()

const { user } = useStore()

const loginInfo = ref<LoginForm>({
  username: 'admin',
  password: '123456',
  grant_type: 'password'
})

const loginRules = ref({
  username: [{
    required: true,
    trigger: 'blur',
    message: i18n.global.t('msg.usernameNotNull')
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: validatePassword()
  }]
})

const passwordType = ref('password')

const loading = ref(false)

const loginFormRef = ref<FormInstance>()

function onchangePasswordType () {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

function handleLogin (form: FormInstance | undefined) {
  if (!form) return
  loading.value = true
  form.validate(valid => {
    if (isNullOrUnDef(user.getTenantId)) {
      emit('tenantWarn', true)
      valid = false
    }
    if (valid) {
      user.login(loginInfo.value).then(() => {
        router.push('/')
      })
    }
  })
  loading.value = false
}
</script>

<style lang='scss' scoped>
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

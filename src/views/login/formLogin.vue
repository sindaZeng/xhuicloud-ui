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
    <el-form ref="loginFormRef" class='login-form' :model='loginForm' :rules='loginRules'>
      <el-form-item prop='tenantId'>
        <span class='svg-container'>
          <xhui-svg icon='tenant'/>
        </span>
        <el-autocomplete
          placeholder="请输入租户名"
          type="text" />
      </el-form-item>
      <el-form-item prop='username'>
        <span class='svg-container'>
          <xhui-svg icon='user'/>
        </span>
        <el-input placeholder='username' name='username' type='text' v-model='loginForm.username'></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <span class='svg-container'>
          <xhui-svg icon='password'/>
        </span>
        <el-input placeholder='password' name='password' :type='passwordType' v-model='loginForm.password'></el-input>
        <span class='show-pwd' @click='onchangePasswordType()'>
          <xhui-svg :icon="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-button type='primary'
                 style='width: 100%; margin-bottom: 30px'
                 :loading='loading'
                 @click='handleLogin'>登录</el-button>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from '@/utils/rules'

const loginForm = ref({
  username: 'admin',
  password: '123456',
  grant_type: 'password'
})

const loginRules = ref({
  username: [{
    required: true,
    trigger: 'blur',
    message: 'username is not null'
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: validatePassword()
  }]
})

const passwordType = ref('password')

const loading = ref(false)

const loginFormRef = ref(null)

const store = useStore()

const onchangePasswordType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      store.dispatch('user/login', loginForm.value)
        .then(() => {
          loading.value = false
        })
        .catch(error => {
          console.log(error)
          loading.value = false
        })
    }
  })
}
</script>

<style lang='scss' scoped>
$dark_gray: #889aa4;
$light_gray: black;
$cursor: black;
.login-form {
  ::v-deep .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  ::v-deep .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background-color: transparent;
      border: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      caret-color: $cursor;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
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
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    caret-color: $cursor;
  }
}
</style>

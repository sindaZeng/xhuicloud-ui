<!--&lt;!&ndash;-->
<!--  - MIT License-->
<!--  - Copyright <2021-2022>-->
<!--  - -->
<!--  - Permission is hereby granted, free of charge, to any person obtaining a copy-->
<!--  - of this software and associated documentation files (the "Software"), to deal-->
<!--  - in the Software without restriction, including without limitation the rights-->
<!--  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies-->
<!--  - of the Software, and to permit persons to whom the Software is furnished to do so,-->
<!--  - subject to the following conditions:-->
<!--  - -->
<!--  - The above copyright notice and this permission notice shall be included in all-->
<!--  - copies or substantial portions of the Software.-->
<!--  - -->
<!--  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,-->
<!--  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A-->
<!--  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT-->
<!--  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF-->
<!--  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE-->
<!--  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.-->
<!--  - @Author: Sinda-->
<!--  - @Email:  xhuicloud@163.com-->
<!--  &ndash;&gt;-->

<!--<template>-->
<!--  <el-form ref='loginFormRef' class='login-form' :model='loginForm' :rules='loginRules'>-->
<!--    <el-form-item prop='username'>-->
<!--        <span class='svg-container'>-->
<!--          <xhui-svg icon='user' />-->
<!--        </span>-->
<!--      <el-input :placeholder='$t(`msg.inputUserName`)' name='username' type='text'-->
<!--                v-model='loginForm.username'></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item prop='password'>-->
<!--        <span class='svg-container'>-->
<!--          <xhui-svg icon='password' />-->
<!--        </span>-->
<!--      <el-input :placeholder='$t(`msg.inputPassword`)' name='password' :type='passwordType'-->
<!--                v-model='loginForm.password'></el-input>-->
<!--      <span class='show-pwd' @click='onchangePasswordType()'>-->
<!--          <xhui-svg :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
<!--        </span>-->
<!--    </el-form-item>-->
<!--    <el-button type='primary'-->
<!--               style='width: 100%; margin-bottom: 30px'-->
<!--               :loading='loading'-->
<!--               @click='handleLogin(loginFormRef)'>{{ $t('msg.login') }}-->
<!--    </el-button>-->
<!--  </el-form>-->
<!--</template>-->

<!--<script lang='ts' setup>-->
<!--import { ref, defineEmits } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import type { FormInstance } from 'element-plus'-->
<!--import i18n from '@/i18n'-->
<!--import { user } from '@/store'-->
<!--import { validatePassword } from '@/utils/rules'-->
<!--import { validatenull } from '@/utils/validate'-->

<!--const emit = defineEmits(['tenantWarn'])-->

<!--const router = useRouter()-->

<!--// eslint-disable-next-line no-undef-->
<!--const loginForm = ref<LoginInfo>({-->
<!--  username: 'admin',-->
<!--  password: '123456',-->
<!--  grant_type: 'password'-->
<!--})-->

<!--const loginRules = ref({-->
<!--  username: [{-->
<!--    required: true,-->
<!--    trigger: 'blur',-->
<!--    message: i18n.global.t('msg.usernameNotNull')-->
<!--  }],-->
<!--  password: [{-->
<!--    required: true,-->
<!--    trigger: 'blur',-->
<!--    validator: validatePassword()-->
<!--  }]-->
<!--})-->

<!--const passwordType = ref('password')-->

<!--const loading = ref(false)-->

<!--const loginFormRef = ref<FormInstance>()-->

<!--const onchangePasswordType = () => {-->
<!--  if (passwordType.value === 'password') {-->
<!--    passwordType.value = 'text'-->
<!--  } else {-->
<!--    passwordType.value = 'password'-->
<!--  }-->
<!--}-->

<!--const handleLogin = (form: FormInstance | undefined) => {-->
<!--  if (!form) return-->
<!--  loading.value = true-->
<!--  form.validate(valid => {-->
<!--    if (validatenull(user.tenantId)) {-->
<!--      emit('tenantWarn', true)-->
<!--      valid = false-->
<!--    }-->
<!--    if (valid) {-->
<!--      store.dispatch('user/login', loginForm.value)-->
<!--        .then(() => {-->
<!--          router.push('/')-->
<!--          loading.value = false-->
<!--        })-->
<!--        .catch(e => {-->
<!--          loading.value = false-->
<!--        })-->
<!--    }-->
<!--  })-->
<!--}-->
<!--</script>-->

<!--<style lang='scss' scoped>-->
<!--$dark_gray: #889aa4;-->
<!--$light_gray: black;-->
<!--$cursor: black;-->

<!--.login-form {-->

<!--  .el-button {-->
<!--    height: 45px;-->
<!--  }-->

<!--  ::v-deep(.el-form-item) {-->
<!--    border: 1px solid rgba(255, 255, 255, 0.1);-->
<!--    background-color: rgba(0, 0, 0, 0.1);-->
<!--    border-radius: 5px;-->
<!--    color: #454545;-->
<!--  }-->

<!--  ::v-deep(.el-input) {-->
<!--    display: inline-block;-->
<!--    height: 47px;-->
<!--    width: 85%;-->

<!--    input {-->
<!--      background-color: transparent;-->
<!--      border: none;-->
<!--      width: 100%;-->
<!--      border-radius: 0px;-->
<!--      padding: 23px 5px 12px 15px;-->
<!--      color: $light_gray;-->
<!--      caret-color: $cursor;-->
<!--    }-->
<!--  }-->

<!--  .svg-container {-->
<!--    padding: 6px 5px 6px 15px;-->
<!--    color: $dark_gray;-->
<!--    vertical-align: middle;-->
<!--    display: inline-block;-->
<!--  }-->

<!--  .title-container {-->
<!--    position: relative;-->
<!--    color: $light_gray;-->
<!--    margin: 0px auto 40px auto;-->
<!--    text-align: center;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  .show-pwd {-->
<!--    position: absolute;-->
<!--    right: 10px;-->
<!--    top: 7px;-->
<!--    font-size: 16px;-->
<!--    color: $dark_gray;-->
<!--    caret-color: $cursor;-->
<!--  }-->
<!--}-->
<!--</style>-->

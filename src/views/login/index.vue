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
  <div class='login-container'>
    <div class='login-form-container'>
      <langSelect class='login-form-langSelect hover-effect'/>

      <FormLogin v-if="login.type==='form'"/>
      <OtherLogin v-if="login.type==='other'"/>
      <div class='login-footer-container'>
        <el-row>
          <el-col :span="8"><a href="#">{{ $t('msg.register') }}</a></el-col>
          <el-col :span="8">
            <a href="#" @click.stop="selectLoginType">{{ $t('msg.'+ getLoginType() + 'Login') }}</a>
          </el-col>
          <el-col :span="8"><a href="#">{{ $t('msg.forgetPassword') }}</a></el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class='copyright' v-html="copyright"></div>
</template>

<script setup>
import FormLogin from './formLogin.vue'
import OtherLogin from './otherLogin.vue'
import { ref } from 'vue'
import { copyright } from '@/config'
import LangSelect from '@/components/LangSelect'

const login = ref({
  type: 'form'
})

const selectLoginType = () => {
  if (login.value.type === 'other') {
    login.value.type = 'form'
  } else {
    login.value.type = 'other'
  }
}

const getLoginType = () => {
  if (login.value.type === 'other') {
    return 'form'
  } else {
    return 'other'
  }
}
</script>

<style lang='scss' scoped>

.login-container {
  height: 100vh;
  background: url('~@/assets/login/background.jpg') center center fixed no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form-container {
    position: relative;
    width: 520px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    padding: 80px 35px 50px;
    margin: 200px 100px auto auto;
    overflow: hidden;

    ::v-deep(.login-form-langSelect) {
      position: absolute;
      top: 5px;
      right:5px;
      font-size: 25px;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
    }

    .login-footer-container {
      margin-top: 10px;
      width: 100%;
      text-align: center;

      a {
        color: #409eff;
        font-weight: 700;
        font-size: 12px;
        margin: 0px 8px;
      }
    }
  }
}

.copyright {
  color: black;
  width: 100%;
  position: fixed;
  bottom: 50px;
  text-align: center;
}
</style>

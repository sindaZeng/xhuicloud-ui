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
      <div class='login-logo-container'>
        <img src="https://img1.baidu.com/it/u=4233922998,2061984360&fm=26&fmt=auto"/>
      </div>
      <FormLogin v-if="login.type==='form'"/>
      <div class='login-footer-container'>
        <el-row>
          <el-col :span="8"><a href="#">注册账号</a></el-col>
          <el-col :span="8"><a href="#" @click.stop="login.type='other'">其他登录</a></el-col>
          <el-col :span="8"><a href="#">忘记密码?</a></el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class='copyright'> {{ copyright }} </div>
</template>

<script setup>
import FormLogin from './formLogin.vue'
import { ref } from 'vue'
import { copyright } from '@/config'

const login = ref({
  type: 'form'
})
</script>

<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: black;
$cursor: black;

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

    .login-logo-container {
      position:relative;
      width: 120px;
      height: 120px;
      margin: -50px auto 20px auto;
      border-radius: 50%;
      -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, 0.07);
      box-shadow: 0 4px 40px rgba(0, 0, 0, 0.07);
      padding: 10px;
      background-color: #fff;
      z-index: 1;
      box-sizing: border-box;
      overflow: hidden;

      img {
        width: 100%;
      }
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

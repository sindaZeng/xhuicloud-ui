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
  <div class='other-login'>
    <el-row justify='center'>
      <el-col class='other-login-type' :span='6'>
        <xhui-svg class='other-login-type-icon' icon='qq' @click='thirdLogin(`QQ`)'/>
      </el-col>
      <el-col class='other-login-type' :span='6'>
        <xhui-svg class='other-login-type-icon' icon='wechat' />
      </el-col>
      <el-col class='other-login-type' :span='6'>
        <xhui-svg class='other-login-type-icon' icon='weibo' />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { openWindows } from '@/utils'
import { validatenull } from '@/utils/validate'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

watch(route, val => {
  const query = val.query
  // 第三方登录
  if (query) {
    if (!validatenull(query.state) && !validatenull(query.code)) {
      this.$store.dispatch('user/loginBySocial', {})
        .then(() => {
          this.$router.push({ path: query.redirect || '/' })
        })
        .catch(() => {
        })
    }
  }
}, {
  immediate: true
})

const thirdLogin = way => {
  const redirectUri = encodeURIComponent(window.location.origin + '/#/auth-redirect')
  let url
  if (way === 'QQ') {
    const clientId = '101887822'
    url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=${clientId}&redirect_uri=${redirectUri}`
  }
  openWindows(url, way, 540, 540)
}
</script>

<style lang='scss'>
.other-login {
  margin-bottom: 50px;
  .other-login-type {
    text-align: center;

    .other-login-type-icon {
      width: 42px;
      height: 42px;
    }
  }
}
</style>

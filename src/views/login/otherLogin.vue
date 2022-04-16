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
        <xhui-svg class='other-login-type-icon' icon='wechat' @click='thirdLogin(`WXMP`)'/>
      </el-col>
      <el-col class='other-login-type' :span='6'>
        <xhui-svg class='other-login-type-icon' icon='weibo' @click='thirdLogin(`WB`)'/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { openWindows } from '@/utils'
import { validatenull } from '@/utils/validate'
import { useRoute, useRouter } from 'vue-router'
import { defineEmits, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { loginWeChatMpQrCode, weChatMpScanSuccess } from '@/api/auth'
import { ElNotification } from 'element-plus'

const route = useRoute()

const router = useRouter()

const store = useStore()

const url = ref('')

const emit = defineEmits(['tenantWarn'])

watch(route, val => {
  const query = val.query
  // 第三方登录
  if (query) {
    if (!validatenull(query.state) && !validatenull(query.code)) {
      store.dispatch('user/login', {
        authCode: query.code,
        type: query.state,
        grant_type: 'social'
      })
        .then(() => {
          router.push({ path: query.redirect || '/' })
        })
        .catch(() => {
        })
    }
  }
}, {
  immediate: true
})

const thirdLogin = async way => {
  const redirectUri = encodeURIComponent(window.location.origin + '/#/auth-redirect')
  let newWindow
  let timer
  let scanSuccess
  if (validatenull(store.getters.tenantId)) {
    emit('tenantWarn', true)
    return
  }
  const socials = store.getters.tenant.socials
  if (validatenull(socials)) {
    error(store.getters.tenant.name)
  }
  if (way === 'QQ') {
    if (validatenull(socials.QQ)) {
      error(store.getters.tenant.name)
    }
    url.value = `https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=${socials.QQ.appId}&redirect_uri=${redirectUri}`
  } else if (way === 'WB') {
    if (validatenull(socials.WB)) {
      error(store.getters.tenant.name)
    }
  } else if (way === 'WXMP') {
    const WXMP = store.getters.tenant.socials.WXMP
    if (validatenull(WXMP)) {
      error(store.getters.tenant.name)
    }
    let ticket = await loginWeChatMpQrCode(WXMP.appId)
    const prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='
    url.value = prefix + ticket
    let seconds = 0
    timer = setInterval(async () => {
      scanSuccess = await weChatMpScanSuccess(WXMP.appId, ticket)
      if (scanSuccess) {
        await router.push(`/login?state=WXMP&code=${ticket}&time=` + new Date().getTime())
        clearInterval(timer)
      } else {
        seconds = seconds + 1
        if (seconds === 25) {
          ticket = await loginWeChatMpQrCode(WXMP.appId)
          url.value = prefix + ticket
          newWindow = openWindows(url.value, way, 540, 540)
        }
      }
    }, 1000)
  }
  newWindow = openWindows(url.value, way, 540, 540)

  const closedWindows = setInterval(() => {
    if (newWindow.closed) {
      clearInterval(closedWindows)
      clearInterval(timer)
    }
    if (scanSuccess) {
      newWindow.close()
    }
  }, 500)
}

const error = name => {
  ElNotification({
    title: 'Error',
    message: name + '不支持此第三方登录',
    type: 'error'
  })
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

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
        <xh-svg class='other-login-type-icon' icon='qq' @click='thirdLogin(`QQ`)'/>
      </el-col>
      <el-col class='other-login-type' :span='6'>
        <xh-svg class='other-login-type-icon' icon='wechat' @click='thirdLogin(`WXMP`)'/>
      </el-col>
      <el-col class='other-login-type' :span='6'>
        <xh-svg class='other-login-type-icon' icon='weibo' @click='thirdLogin(`WB`)'/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { defineEmits, ref, watch } from 'vue'
import { loginQrcodeScanSuccess, getLoginQrcode } from '@/api/upms/auth'
import { openWindows } from '@/utils'
import { isNullOrUnDef } from '@/utils/is'
import useStore from '@/store'
import { ElNotification } from 'element-plus'

const route = useRoute()

const { user } = useStore()

const router = useRouter()

const url = ref('')

const emit = defineEmits(['tenantWarn'])

watch(route, val => {
  const query = val.query
  // 第三方登录
  if (query) {
    if (!isNullOrUnDef(query.state) && !isNullOrUnDef(query.code)) {
      user.login({
        authCode: query.code as string,
        type: query.state as string,
        grant_type: 'social'
      }).then(() => {
        router.push((query.redirect || '/') as string)
      })
    }
  }
}, {
  immediate: true
})

const thirdLogin = async (way: string) => {
  const redirectUri = encodeURIComponent(window.location.origin + '/#/auth-redirect')
  let newWindow: Window | null
  let timer: number
  let scanSuccess: boolean
  if (isNullOrUnDef(user.getTenantId)) {
    emit('tenantWarn', true)
    return
  }
  const tenant = user.getTenant
  const socials = tenant.socials
  if (isNullOrUnDef(socials)) {
    error(tenant.name)
  }
  if (way === 'QQ') {
    const qq = socials.QQ
    if (isNullOrUnDef(qq)) {
      error(tenant.name)
    }
    url.value = `https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=${qq?.appId}&redirect_uri=${redirectUri}`
  } else if (way === 'WB') {
    if (isNullOrUnDef(socials.WB)) {
      error(tenant.name)
    }
  } else if (way === 'WXMP') {
    const WXMP = socials.WXMP
    if (isNullOrUnDef(WXMP)) {
      error(tenant.name)
    }
    let qrCode = await getLoginQrcode(WXMP?.appId as string)
    const prefix = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='
    url.value = prefix + qrCode.data
    let seconds = 0
    timer = window.setInterval(async () => {
      const response = await loginQrcodeScanSuccess(WXMP?.appId as string, qrCode.data)
      scanSuccess = response.data
      if (scanSuccess) {
        await router.push(`/login?state=WXMP&code=${qrCode.data}&time=` + new Date().getTime())
        timer && window.clearInterval(timer)
      } else {
        seconds = seconds + 1
        if (seconds === 25) {
          qrCode = await getLoginQrcode(WXMP?.appId as string)
          url.value = prefix + qrCode.data
          newWindow = openWindows(url.value, way, 540, 540)
        }
      }
    }, 1000)
  }
  newWindow = openWindows(url.value, way, 540, 540)

  const closedWindows = window.setInterval(() => {
    if (newWindow!.closed) {
      closedWindows && window.clearInterval(closedWindows)
      timer && window.clearInterval(timer)
    }
    if (scanSuccess) {
      newWindow!.close()
    }
  }, 500)
}

const error = (name: string) => {
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

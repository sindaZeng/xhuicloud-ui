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
  <div class="login-container">
    <div class="login-form-container animate__animated animate__bounceInRight">
      <div class="login-logo-container">
        <img :src="user.getTenant?.logo || 'https://xhuicloud.oss-cn-shenzhen.aliyuncs.com/xhuicloud-logo.png'" />
      </div>
      <XhLangSelect class="login-langSelect hover-effect" />
      <h4 class="login-tenantSelect" :style="tenantSelectAnimation">
        <el-select v-model="active" placeholder="点击请选择租户" @change="changeTenant">
          <el-option v-for="tenant in tenants" :key="tenant.id" :label="tenant.name" :value="tenant.id"> </el-option>
        </el-select>
      </h4>
      <FormLogin v-if="login.type === 'form'" @tenant-warn="tenantWarn" />
      <OtherLogin v-if="login.type === 'other'" @tenant-warn="tenantWarn" />
      <div class="login-footer-container">
        <el-row>
          <el-col :span="8"
            ><a href="#">{{ $t('msg.register') }}</a></el-col
          >
          <el-col :span="8">
            <a href="#" @click.stop="selectLoginType">{{ $t('msg.' + getLoginType() + 'Login') }}</a>
          </el-col>
          <el-col :span="8"
            ><a href="#">{{ $t('msg.forgetPassword') }}</a></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
  <div class="copyright">
    <a href="http://beian.miit.gov.cn" target="view_window">粤ICP备2022008047号-1</a>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { ElNotification } from 'element-plus'
  import FormLogin from './formLogin.vue'
  import OtherLogin from './otherLogin.vue'
  import useStore from '@/store'
  import { tenantList } from '@/api/upms/tenant'
  import { Tenant } from '@/api/upms/entity/tenant'
  import { isNullOrUnDef } from '@/utils/is'

  const { user } = useStore()

  const login = ref({
    type: 'form'
  })

  const active = ref(user.getTenantId)

  const tenants = ref<Tenant[]>()

  const tenantSelectAnimation = ref('')

  function selectLoginType() {
    if (login.value.type === 'other') {
      login.value.type = 'form'
    } else {
      login.value.type = 'other'
    }
  }

  function getLoginType() {
    if (login.value.type === 'other') {
      return 'form'
    } else {
      return 'other'
    }
  }

  function changeTenant(val: number) {
    user.setTenant(tenants.value?.find((item) => item.id === val) as Tenant)
  }

  onMounted(async () => {
    const res = await tenantList()
    tenants.value = res
  })

  function tenantWarn(val: boolean) {
    if (val && isNullOrUnDef(active.value)) {
      ElNotification({
        title: 'Warning',
        message: '请选择一个租户!',
        type: 'warning'
      })
      tenantSelectAnimation.value = '-webkit-animation: tenantWarn 0.5s linear 2 both;'
    }
  }
</script>

<style lang="scss">
  @import '@/styles/login.scss';
</style>

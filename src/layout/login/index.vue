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
    <div class="login-form-container">
      <div class="login-logo-container">
        <img
          :src="userStore.getTenant?.logo || 'https://img1.baidu.com/it/u=4233922998,2061984360&fm=26&fmt=auto'"
        />
      </div>
      <langSelect class="login-langSelect hover-effect" />
      <h4 class="login-tenantSelect" :style="tenantSelectAnimation">
        <el-select
          v-model="active"
          @change="changeTenant"
          placeholder="点击请选择租户">
          <el-option
            v-for="tenant in tenants"
            :key="tenant.id"
            :label="tenant.name"
            :value="tenant.id">
          </el-option>
        </el-select>
      </h4>
      <FormLogin v-if="login.type === 'form'" @tenantWarn="tenantWarn" />
<!--      <OtherLogin v-if="login.type === 'other'" @tenantWarn="tenantWarn" />-->
      <div class="login-footer-container">
        <el-row>
          <el-col :span="8"
          ><a href="#">{{ $t('msg.register') }}</a></el-col
          >
          <el-col :span="8">
            <a href="#" @click.stop="selectLoginType">{{
                $t('msg.' + getLoginType() + 'Login')
              }}</a>
          </el-col>
          <el-col :span="8"
          ><a href="#">{{ $t('msg.forgetPassword') }}</a></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
  <div class="copyright" v-html="setting.copyright"></div>
</template>

<script lang='ts' setup>
import FormLogin from './formLogin.vue'
import LangSelect from '@/components/XhLangSelect/index.vue'
import { onMounted, ref } from 'vue'
import setting from '@/config/setting.config'
import { useUserStore } from '@/store/modules/user'
import { tenantList } from '@/api/upms/tenant'
import { ElNotification } from 'element-plus'
import { Tenant } from '@/api/upms/entity/tenant'

const userStore = useUserStore()

const login = ref({
  type: 'form'
})

const active = ref(userStore.getTenantId)

const tenants = ref<Tenant[]>()

const tenantSelectAnimation = ref('')

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

const changeTenant = (val: number) => {
  useUserStore().setTenant(tenants.value?.find((item) => item.id === val) as Tenant)
}
onMounted(async () => {
  const res = await tenantList()
  tenants.value = res
})

const tenantWarn = (val: boolean) => {
  if (val) {
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

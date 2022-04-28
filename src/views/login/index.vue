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
          :src="
            $store.getters.tenant
              ? $store.getters.tenant.logo
              : `https://img1.baidu.com/it/u=4233922998,2061984360&fm=26&fmt=auto`
          "
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
      <FormLogin v-if="login.type === 'form'" @tenantWarn="tenantWran" />
      <OtherLogin v-if="login.type === 'other'" @tenantWarn="tenantWran" />
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
  <div class="copyright" v-html="copyright"></div>
</template>

<script setup>
import FormLogin from './formLogin.vue'
import OtherLogin from './otherLogin.vue'
import { ref, watch } from 'vue'
import { copyright } from '@/config'
import LangSelect from '@/components/LangSelect'
import { tenantList } from '@/api/tenant'
import { validatenull } from '@/utils/validate'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()

const login = ref({
  type: 'form'
})

const store = useStore()

const active = ref(store.getters.tenantId)

const tenants = ref([])

const tenantSelectAnimation = ref('')

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

const changeTenant = (val) => {
  store.commit(
    'user/setTenant',
    tenants.value.find((item) => item.id === val)
  )
}

const getTenantList = () => {
  if (validatenull(tenants.value)) {
    tenantList().then((response) => {
      tenants.value = response
    })
  }
}

getTenantList()

const tenantWran = val => {
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

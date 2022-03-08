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
  <div class="navbar" :style='{ background: $store.getters.ddCss.navbarBg }'>
    <hamburger class='hamburger-container'/>
    <breadcrumb class='breadcrumb-container'/>
    <div class='right-menu'>
      <screenfull class='right-menu-item hover-effect'/>
      <themeSelect class='right-menu-item hover-effect'/>
      <langSelect class='right-menu-item hover-effect'/>
      <el-dropdown class='avatar-container' trigger='click'>
        <div class='avatar-wrapper'>
          <el-avatar shape='square' :size='40' :src='$store.getters.userInfo.avatar'></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class='user-dropdown'>
            <router-link to='/'>
              <el-dropdown-item>{{ $t('msg.homePage') }}</el-dropdown-item>
            </router-link>
            <router-link to='/'>
              <el-dropdown-item>{{ $t('msg.userInfo') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click='logout'>{{ $t('msg.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import ThemeSelect from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'

const store = useStore()

const router = useRouter()

const logout = () => {
  store.dispatch('user/logout').then(() => {
    router.push('/login')
  })
}

</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

      ::v-deep(.right-menu-item) {
        display: inline-block;
        padding: 5px 10px 0 0;
        font-size: 20px;
        color: #fff;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
        }
      }

      ::v-deep(.avatar-container) {
        cursor: pointer;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .el-avatar {
            margin-right: 12px;
          }
        }
      }
  }
}
</style>

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
  <div class='app-container' :class='[app.getSidebarStatus ? `openSidebar` : `closeSidebar`]'>
    <div class='left-body'>
      <!-- 左侧菜单 -->
      <sidebar/>
    </div>
    <div class='right-body'>
      <div class='header-container'>
        <!-- 顶部 navbar -->
        <navbar />
      </div>
      <div class='main-container'>
        <!--  标签      -->
        <tag-view />
        <!-- main -->
        <app-main />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './Navbar/index.vue'
import Sidebar from './Sidebar/index.vue'
import TagView from '@/components/XhTagView/index.vue'
import AppMain from './AppMain/index.vue'
import { ref, onUnmounted, onMounted } from 'vue'
import setting from '@/config/setting.config'
import { checkToken } from '@/api/upms/auth'
import useStore from '@/store'

const { user, app } = useStore()

const refreshTime = ref(0)

function onCreate () {
  refreshTime.value = window.setInterval(() => {
    if (user.getToken && user.getRefreshToken) {
      checkToken(user.getToken).then(response => {
        const exp = response && response.data && response.data.exp
        if (exp && exp - new Date().getTime() <= setting.expiredPeriod) {
          user.refreshToken().catch(() => {
            window.clearInterval(refreshTime.value)
          })
        }
      })
    }
  }, setting.expiredPeriod)
}

onMounted(() => onCreate())

onUnmounted(() => window.clearInterval(refreshTime.value))

</script>

<style lang='scss' scoped>
//@import "~@/styles/variables.scss";

.app-container {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: #f0f2f5 no-repeat;

  .right-body {
    top: 50px;
    right: 0;
    margin-left: $sideBarWidth;
    z-index: 9;
    height: 100%;
    position: fixed;
    width: 100%;

    transition: width #{$sidebarTransition};

    .header-container {
      position: fixed;
      top: 0;
      right: 0;
      height: 50px;
      width: calc(100% - #{$sideBarWidth});
      transition: width #{$sidebarTransition};
    }
  }
}

</style>

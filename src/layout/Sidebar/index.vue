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
  <div v-if="theme.showSidebarLogo" class="logo-container" :style="{ background: theme.getThemeCss.navbarBg }">
    <img :src="user.getTenant?.logo" class="sidebar-logo" />
    <h1 v-if="app.getSidebarStatus" class="logo-title" style="color: black">{{ name }}</h1>
  </div>
  <el-scrollbar>
    <sidebar-menu></sidebar-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
  import useStore from '@/store'
  import SidebarMenu from '@/components/XhSidebar/SidebarMenu.vue'

  const { app, user, theme } = useStore()

  const name = user.getTenant.name
</script>

<style lang="scss" scoped>
  .logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }

  .logo-title {
    display: inline-block;
    color: black;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    margin-left: 12px;
  }
</style>

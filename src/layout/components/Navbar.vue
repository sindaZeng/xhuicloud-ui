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
  <div class="navbar">
    <div class='right-menu'>
      <el-dropdown class='avatar-container' trigger='click'>
        <div class='avatar-wrapper'>
          <el-avatar shape='square' :size='40' :src='$store.getters.userInfo.avatar'></el-avatar>
          <i class='el-icon-s-tools'></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class='user-dropdown'>
            <router-link to='/'>
              <el-dropdown-item>系统主页</el-dropdown-item>
            </router-link>
            <router-link to='/'>
              <el-dropdown-item>用户信息</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click='logout'>用户登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const logout = () => {
  store.dispatch('user/logout')
}

</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $navbarBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

      ::v-deep .avatar-container {
        cursor: pointer;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .el-avatar {
            --el-avatar-background-color: none;
            margin-right: 12px;
          }
        }
      }
  }
}
</style>

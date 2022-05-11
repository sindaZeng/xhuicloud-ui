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
    <el-menu :uniqueOpened='true'
                      :collapse='!$store.getters.sidebarStatus'
                      :default-active='activeMenu'
                      :background-color='$store.getters.ddCss.menuBg'
                      :text-color='$store.getters.ddCss.menuText'
                      :active-text-color='$store.getters.ddCss.menuActiveText'
                      router>
    <sidebar-item v-for='item in menus'
                  :key='item.path'
                  :route='item'>
    </sidebar-item>
  </el-menu>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const menus = userStore.getUserMenus

const activeMenu = computed(() => {
  return useRoute().path
})

</script>

<style lang='scss' scoped>

</style>

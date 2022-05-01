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
  <div class='tag-view-container'>
    <div class="tags-box">
      <div class="tabs">
        <el-tabs v-model="activeTag"
                 :closable='$store.getters.tagViews.length > 1'
                 type="card"
                 v-on:contextmenu.prevent="openContextmenu($event)"
                 v-on:tab-click='tabClick'
                 v-on:edit="delTagView">
          <el-tab-pane v-for='item in $store.getters.tagViews' :key='item.name' :name='item.path'>
            <template #label>
              <menu-item :title='$t(`menu.`+ item.meta.internationalization)' :icon='item.meta.icon'></menu-item>
            </template>
          </el-tab-pane>
        </el-tabs>
        <ul v-show="visible" :style="contextmenuStyle" class="contextmenu">
          <li @click='delTagView(contextmenuTag, `remove`)'>{{ $t(`tags.close`) }}</li>
          <li @click='delOtherTagView(contextmenuTag)'>{{ $t(`tags.closeOthers`) }}</li>
          <li @click='delAllTagViews'>{{ $t(`tags.closeAll`) }}</li>
        </ul>
      </div>
      <div class="tabs-more">
        <el-dropdown trigger='click'>
          <el-button
            type='primary'
            size="mini">
            更多
            <el-icon style="vertical-align: middle;">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class='user-dropdown'>
              <el-dropdown-item @click='delOtherTagView(contextmenuTag)'>{{ $t(`tags.closeOthers`) }}</el-dropdown-item>
              <el-dropdown-item @click='delAllTagViews'>{{ $t(`tags.closeAll`) }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowDown
} from '@element-plus/icons'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import MenuItem from '@/components/Sidebar/MenuItem'
const store = useStore()

const activeTag = ref('')

const contextmenuTag = ref('')

const visible = ref(false)

const contextmenuStyle = ref({
  left: 0,
  top: 0
})

const router = useRouter()

const route = useRoute()
watch(
  route,
  (to, form) => {
    activeTag.value = to.path
  },
  {
    immediate: true
  }
)
watch(visible, value => {
  if (value) {
    document.body.addEventListener('click', closeContextmenu)
  } else {
    document.body.removeEventListener('click', closeContextmenu)
  }
})

const tabClick = item => {
  let tag
  store.getters.tagViews.map(tagView => {
    if (tagView.path === item.props.name) {
      tag = tagView
    }
  })
  router.push({
    path: tag.path,
    query: tag.query,
    fullPath: tag.fullPath
  }).catch(() => {})
}

const openContextmenu = (e) => {
  const { x, y } = e
  contextmenuStyle.value.left = x + 'px'
  contextmenuStyle.value.top = y + 'px'
  contextmenuTag.value = e.target.getAttribute('aria-controls').slice(5)
  visible.value = !visible.value
}

const closeContextmenu = () => {
  visible.value = false
}
/**
 * 关闭当前
 * @param index
 */
const delTagView = (path, action) => {
  if (action === 'remove') {
    store.commit('app/delTagView', path)
    if (isActive(path)) {
      pushLastView()
    }
  }
}

/**
 * 关闭其他
 * @param index
 */
const delOtherTagView = path => {
  store.commit('app/delOtherTagView', path)
  pushLastView()
}

/**
 * 关闭其他
 * @param index
 */
const delAllTagViews = () => {
  store.commit('app/delAllTagViews')
  pushLastView()
}

/**
 * 去到上一个视图
 */
const pushLastView = () => {
  const latestView = store.getters.tagViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.path || latestView.fullPath)
  } else {
    router.push('/')
  }
}

/**
 * 是否当前
 * @param path
 * @returns {boolean}
 */
const isActive = path => {
  return path === route.path
}
</script>

<style lang='scss'>
</style>

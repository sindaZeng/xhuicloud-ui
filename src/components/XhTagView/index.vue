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
  <div class="tag-view-container">
    <div class="tags-box">
      <div class="tabs">
        <el-tabs
          v-model="activeTag"
          :closable="app.getTagViews.length > 1"
          type="card"
          @contextmenu.prevent="openContextmenu($event)"
          @tab-click="tabClick"
          @edit="delTagView"
        >
          <el-tab-pane v-for="item in app.getTagViews" :key="item.name" :name="item.path">
            <template #label>
              <menu-item :title="$t(`menu.` + item.meta.internationalization)" :icon="item.meta.icon"></menu-item>
            </template>
          </el-tab-pane>
        </el-tabs>
        <ul v-show="visible" :style="contextmenuStyle" class="contextmenu">
          <li @click="delTagView(contextmenuTag, `remove`)">{{ $t(`tags.close`) }}</li>
          <li @click="delOtherTagView(contextmenuTag)">{{ $t(`tags.closeOthers`) }}</li>
          <li @click="delAllTagViews">{{ $t(`tags.closeAll`) }}</li>
        </ul>
      </div>
      <div class="tabs-more">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small">
            更多
            <el-icon style="vertical-align: middle">
              <ArrowDown />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item @click="delOtherTagView(contextmenuTag)">{{ $t(`tags.closeOthers`) }}</el-dropdown-item>
              <el-dropdown-item @click="delAllTagViews">{{ $t(`tags.closeAll`) }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { TabsPaneContext } from 'element-plus'
  import { ArrowDown } from '@element-plus/icons-vue'
  import MenuItem from '@/components/XhSidebar/MenuItem.vue'
  import { HomeTag } from '~/homeTag'
  import useStore from '@/store'

  const { app } = useStore()

  const router = useRouter()

  const route = useRoute()

  const activeTag = ref('')

  const contextmenuTag = ref('')

  const visible = ref(false)

  const contextmenuStyle = ref({
    left: '0',
    top: '0'
  })

  watch(
    route,
    (to) => {
      activeTag.value = to.path
    },
    {
      immediate: true
    }
  )

  watch(visible, (value) => {
    if (value) {
      document.body.addEventListener('click', closeContextmenu)
    } else {
      document.body.removeEventListener('click', closeContextmenu)
    }
  })

  function tabClick(pane: TabsPaneContext) {
    let tag: HomeTag
    app.getTagViews.forEach((tagView) => {
      if (tagView.path === pane.props.name) {
        tag = tagView
      }
    })
    router.push({
      path: tag!.path,
      query: tag!.query
    })
  }

  function openContextmenu(e: any) {
    const { x, y } = e
    contextmenuStyle.value.left = x + 'px'
    contextmenuStyle.value.top = y + 'px'
    contextmenuTag.value = e.target.getAttribute('aria-controls').slice(5)
    visible.value = !visible.value
  }

  function closeContextmenu() {
    visible.value = false
  }
  /**
   * 关闭当前
   * @param index
   */
  function delTagView(path: string, action: string) {
    if (action === 'remove') {
      app.delTagView(path)
      if (isActive(path)) {
        pushLastView()
      }
    }
  }

  /**
   * 关闭其他
   * @param index
   */
  function delOtherTagView(path: string) {
    app.delOtherTagView(path)
    pushLastView()
  }

  /**
   * 关闭其他
   * @param index
   */
  function delAllTagViews() {
    app.delAllTagViews()
    pushLastView()
  }

  /**
   * 去到上一个视图
   */
  function pushLastView() {
    const latestView = app.getTagViews.slice(-1)[0]
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
  function isActive(path: string) {
    return path === route.path
  }
</script>

<style lang="scss"></style>

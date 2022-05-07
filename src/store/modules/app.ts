/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

import { defineStore } from 'pinia'
import { storageLocal } from '@/utils/storage'
import { findTagViewsIndex } from '@/utils'
import setting from '@/config/setting.config'

export const useAppStore = defineStore('app', {
  state: () => ({
    tagViews: storageLocal.getItem<HomeTag[]>(setting.tagViewsKey) ?? defaultHomeTag,
    tagView: storageLocal.getItem<string>(setting.tagViewKey),
    sidebarStatus: true,
    lang: storageLocal.getItem<string>(setting.languageKey) ?? setting.language
  }),

  actions: {
    changeSidebarStatus () {
      this.sidebarStatus = !this.sidebarStatus
    },
    setLang (lang: string) {
      storageLocal.setItem(setting.languageKey, lang)
      this.lang = lang
    },
    addTagView (tagView: HomeTag) {
      this.tagView = tagView.path
      storageLocal.setItem(setting.tagViewKey, this.tagView)
      if (this.tagViews.find(item => {
        return item.path === tagView.path
      })) return
      this.tagViews.push(tagView)
      storageLocal.setItem(setting.tagViewsKey, this.tagViews)
    },
    /**
     * 根据path删除
     * @param path
     */
    delTagView (path: string) {
      this.tagViews.splice(findTagViewsIndex(this.tagViews, path), 1)
      if (this.tagViews.length < 1) {
        this.tagViews.push(defaultHomeTag)
      }
      storageLocal.setItem(setting.tagViewsKey, this.tagViews)
    },
    /**
     * 删除其他标签
     * @param state
     * @param index
     */
    delOtherTagView (path: string) {
      const index = findTagViewsIndex(this.tagViews, path)
      // 删除当前右侧
      this.tagViews.splice(index + 1, this.tagViews.length - index + 1)
      // 删除当前左侧
      this.tagViews.splice(0, index)
      storageLocal.setItem(setting.tagViewsKey, this.tagViews)
    },
    /**
     * 删除所有标签
     * @param state
     */
    delAllTagViews () {
      this.tagViews = [defaultHomeTag]
      storageLocal.setItem(setting.tagViewsKey, this.tagViews)
    }
  }
})

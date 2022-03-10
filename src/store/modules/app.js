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

import { setStorage, getStorage } from '@/utils/storage'
import { findTagViewsIndex } from '@/utils'
import { language, languageKey, tagViewsKey, tagViewKey } from '@/config'
const actions = {
}

const mutations = {
  changeSidebarStatus (state) {
    state.sidebarStatus = !state.sidebarStatus
  },
  setLang (state, lang) {
    setStorage(languageKey, lang)
    state.lang = lang
  },
  addTagView (state, tagView) {
    state.tagView = tagView.path
    setStorage(tagViewKey, state.tagView)
    if (state.tagViews.find(item => {
      return item.path === tagView.path
    })) return
    state.tagViews.push(tagView)
    setStorage(tagViewsKey, state.tagViews)
  },
  /**
   * 根据下标删除
   * @param state
   * @param index
   */
  delTagView (state, path) {
    state.tagViews.splice(findTagViewsIndex(state.tagViews, path), 1)
    setStorage(tagViewsKey, state.tagViews)
  },
  /**
   * 删除其他标签
   * @param state
   * @param index
   */
  delOtherTagView (state, path) {
    const index = findTagViewsIndex(state.tagViews, path)
    // 删除当前右侧
    state.tagViews.splice(index + 1, state.tagViews.length - index + 1)
    // 删除当前左侧
    state.tagViews.splice(0, index)
    setStorage(tagViewsKey, state.tagViews)
  },
  /**
   * 删除所有标签
   * @param state
   */
  delAllTagViews (state) {
    state.tagViews = []
  }
}

const state = {
  tagViews: getStorage(tagViewsKey) || [],
  tagView: getStorage(tagViewKey) || 0,
  sidebarStatus: true,
  lang: getStorage(languageKey) || language
}

export default {
  actions,
  mutations,
  state
}

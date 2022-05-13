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

import router from '@/router'
import setting from '@/config/setting.config'
import i18n from '@/i18n'
import { isNullAndUnDef } from '@/utils/is'
import { useUserStore } from '~/store/user'
import { useAppStore } from '~/store/app'
import { toRouteType } from '@/router/types'

const whiteList = ['/login', '/auth-redirect']

/**
 * 前置
 */
router.beforeEach(async (to: toRouteType, _from, next) => {
  const meta = to.meta || {}
  document.title = meta.title ? i18n.global.t('menu.' + meta.title) : setting.title
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.getToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (isNullAndUnDef(userStore.getSysUser)) {
        userStore.getUserInfo()
      }
      const {
        fullPath,
        meta,
        path,
        params,
        query
      } = to
      appStore.addTagView({
        fullPath,
        meta,
        path,
        params,
        query
      })
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

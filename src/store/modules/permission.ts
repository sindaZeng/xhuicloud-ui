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
import { RouteRecordRaw } from 'vue-router'
import commonsRoutes from '@/router/commons'
import layout from '@/layout/index.vue'

interface Permission {
  routes: RouteRecordRaw[];
}

const modules = import.meta.glob('../../views/**/**.vue')

const usePermissionStore = defineStore('permission', {

  state: (): Permission => ({
    routes: []
  }),
  actions: {
    setRoutes (routes: RouteRecordRaw[]) {
      this.routes = commonsRoutes.concat(routes)
    },
    async initRoutes (routes: RouteRecordRaw[]) {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        const tmp = { ...route } as any
        if (tmp.path === 'Layout' || tmp.path === 'layout') {
          tmp.component = layout
        } else {
          const component = modules[`../../views/${tmp.path}.vue`] as any
          if (component) {
            tmp.component = modules[`../../views/${tmp.path}.vue`]
          } else {
            tmp.component = modules['../../views/error-page/404.vue']
          }
        }
        res.push(tmp)

        if (tmp.children) {
          tmp.children = this.initRoutes(tmp.children)
        }
      })
      return res
    }
  }
})

export default usePermissionStore

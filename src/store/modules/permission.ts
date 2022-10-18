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
import layout from '@/layout/index.vue'
import { isNull } from '@/utils/is'
import { Menu } from '@/api/upms/entity/menu'
import { menu } from '@/api/upms/menu'
import commonsRoutes from '@/router/commons'

export interface XhRoute {
  routes: RouteRecordRaw[]
  /** 是否已经执行动态路由添加 **/
  isDynamicAddedRoute: boolean
}

const modules = import.meta.glob('@/views/**/*.vue')

const generator = (routes: Menu[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route } as any
    if (!isNull(tmp.children)) {
      tmp.component = layout
    } else {
      const component = modules[`../../views${tmp.path}.vue`] as any
      if (component) {
        tmp.component = component
      } else {
        tmp.component = modules['@/views/error/404.vue']
      }
    }
    tmp.meta = { title: tmp.title, internationalization: 'menu.' + tmp.internationalization, icon: tmp.icon }
    res.push(tmp)
    if (tmp.children) {
      tmp.children = generator(tmp.children)
    }
  })
  return res
}

const usePermissionStore = defineStore('permission', {
  state: (): XhRoute => ({
    routes: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.routes
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async initRoutes(): Promise<RouteRecordRaw[]> {
      const menus = await menu()
      const res = generator(menus)
      this.routes = res.concat(commonsRoutes)
      return res
    }
  }
})
export default usePermissionStore

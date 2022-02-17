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

import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
import store from '@/store'
import { addRoutes } from '@/utils/route'
import { toRaw } from 'vue'

const commonsRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: {
          title: 'home',
          icon: 'home'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: commonsRoutes
})

const getPrivateRoutes = () => {
  if (store.getters.token) {
    if (store.getters.userMenus <= 0) {
      store.dispatch('user/getMenu').then(response => {
        return response
      })
    }
  }
  if (store.getters.userMenus) {
    addRoutes(toRaw(store.getters.userMenus), router)
  }
}
getPrivateRoutes()

export default router

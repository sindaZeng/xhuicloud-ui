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
import layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'

const commonsRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/layout/Login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    component: layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          icon: 'home',
          internationalization: 'menu.home'
        }
      }
    ]
  },
  {
    path: '/component',
    name: '公共组件',
    component: layout,
    meta: {
      internationalization: 'menu.CommonComponent',
      icon: 'Component'
    },
    children: [
      {
        path: '/component/table',
        name: `表格演示`,
        meta: {
          internationalization: 'menu.Table',
          icon: 'table'
        },
        component: () => import('@/views/component/table/index.vue')
      },
      {
        path: '/component/form',
        name: `表单演示`,
        meta: {
          internationalization: 'menu.Form',
          icon: 'form'
        },
        component: () => import('@/views/component/form/index.vue')
      }
    ]
  }
]

export default commonsRoutes

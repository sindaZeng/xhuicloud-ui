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

import path from 'path'

export const getChildRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

export const filterRoutes = routes => {
  const childRoutes = getChildRoutes(routes)
  return routes.filter(route => {
    return !childRoutes.find(childRoute => {
      return childRoute.path === route.path
    })
  })
}

function isNull (data) {
  return !data || JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'
}

export const generateRoutes = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    if (isNull(item.children) && isNull(item.meta)) {
      return
    }
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateRoutes(item.children))
      return
    }
    const routePath = path.resolve(basePath, item.path)

    let route = result.find(item => item.path === routePath)
    // 路由没有加载到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }

    if (!isNull(item.children)) {
      route.children.push(...generateRoutes(item.children, route.path))
    }
  })
  return result
}

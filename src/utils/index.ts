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

import { HomeTag } from '~/homeTag'

export function scssExportToJson(scssExportJson: any) {
  const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
  const scssJson: any = {}
  jsonString
    .slice(1, jsonString.length - 2)
    .split(';')
    .forEach((fItem: string) => {
      const arr = fItem.split(':')
      scssJson[arr[0]] = arr[1]
    })
  return scssJson
}

export function findTagViewsIndex(tagViews: HomeTag[], path: string): number {
  let key = 0
  tagViews.forEach((item, index) => {
    if (item.path === path) {
      key = index
    }
  })
  return key
}

export function checkData(val: any, defaultVal: any) {
  if (val) {
    return true
  }
  return defaultVal
}

/**
 * 获取链接中的参数
 * @param url
 * @param paraName
 * @returns {string|*}
 */
export const getQueryString = (url: string, paraName: string) => {
  const arrObj = url.split('?')
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

export function openWindows(url: string, title: string, w: number, h: number): Window | null {
  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  const left = width / 2 - w / 2 + window.screenLeft
  const top = height / 2 - h / 2 + window.screenTop
  const newWindow: Window | null = window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  newWindow?.focus()
  return newWindow
}

/**
 * 首字母大写
 * @param str
 * @returns
 */
export function ucfirst(str: string) {
  const firstLetter = str.substring(0, 1)
  return firstLetter.toUpperCase() + str.substring(1)
}

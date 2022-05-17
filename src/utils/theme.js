/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */
import rgbHex from 'rgb-hex'
import axios from 'axios'
import colorConvert from 'css-color-function'
import elementPlus from 'element-plus/package.json'

const version = elementPlus.version

const formula = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))',
  subMenuHover: 'color(primary tint(70%))',
  subMenuBg: 'color(primary tint(80%))',
  menuHover: 'color(primary tint(90%))',
  navbarBg: 'color(primary)'
}

const elementPlusColor = {
  '#3a8ee6': 'shade-1',
  '#409eff': 'primary',
  '#53a8ff': 'light-1',
  '#66b1ff': 'light-2',
  '#79bbff': 'light-3',
  '#8cc5ff': 'light-4',
  '#a0cfff': 'light-5',
  '#b3d8ff': 'light-6',
  '#c6e2ff': 'light-7',
  '#d9ecff': 'light-8',
  '#ecf5ff': 'light-9'
}

/**
 * 获取颜色
 * @param color
 * @returns {{color}}
 */
export const getColor = color => {
  if (!color) return
  const colors = {
    primary: color
  }
  Object.keys(formula).forEach(key => {
    const val = formula[key].replace(/primary/g, color)
    colors[key] = '#' + rgbHex(colorConvert.convert(val))
  })
  return colors
}

/**
 * 标记需要替换的样式
 * @param data
 */
const markStyle = data => {
  Object.keys(elementPlusColor).forEach(key => {
    const val = elementPlusColor[key]
    data = data.replace(new RegExp(key, 'ig'), val)
  })
  return data
}

/**
 * 获取默认的样式
 * @returns {Promise<void>}
 */
const getDefaultStyle = async () => {
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return markStyle(data)
}

/**
 * 动态保存样式
 * @param newStyle
 */
export const saveStyle = newStyle => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 动态保存link
 * @param url
 */
export const saveLink = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

export const getStyle = async themeColor => {
  const colors = getColor(themeColor)
  let cssText = await getDefaultStyle()
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })
  return cssText
}

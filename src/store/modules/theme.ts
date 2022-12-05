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
import theme from '@/config/theme.config'
import styles from '@/styles/variables.global.scss'
import { scssExportToJson } from '@/utils'

const useThemeStore = defineStore('theme', {
  state: () => ({
    sidebarLogo: true,
    cardStyle: true,
    variables: scssExportToJson(styles),
    themeColor: theme.themeColor
  }),
  getters: {
    getThemeCss(): any {
      return { ...this.variables, menuActiveText: this.themeColor }
    },
    showSidebarLogo(): boolean {
      return this.sidebarLogo || storageLocal.getItem<boolean>(theme.sidebarLogo)
    },
    getCardStyles(): boolean {
      return this.cardStyle || storageLocal.getItem<boolean>(theme.cardStyle)
    },
    getThemeColor(): string {
      return storageLocal.getItem<string>(theme.themeKey) || this.themeColor
    }
  },
  actions: {
    setThemeColor(themeColor: string) {
      storageLocal.setItem(theme.themeKey, themeColor)
      this.themeColor = themeColor
      this.variables.navbarBg = themeColor
    },
    setSidebarLogo(sidebarLogo = true) {
      storageLocal.setItem(theme.sidebarLogo, sidebarLogo)
      this.sidebarLogo = sidebarLogo
    },
    setCardStyle(cardStyle = true) {
      storageLocal.setItem(theme.cardStyle, cardStyle)
      this.cardStyle = cardStyle
    }
  }
})

export default useThemeStore

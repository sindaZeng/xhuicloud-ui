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
import { global } from '@/i18n'

export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length === '' || value.length == null || value.length === undefined || value.length < 6) {
      callback(new Error(global.t('msg.passwordNotNull')))
    } else {
      callback()
    }
  }
}

export const checkStringLengthOf8 = () => {
  return (rule: any, value: any, callback: any) => {
    let len = 0
    for (let i = 0; i < value.length; i++) {
      const c = value.charCodeAt(i)
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++
      } else {
        len += 2
      }
    }
    if (len > 8) {
      callback(new Error(global.t('WeChatMenu.nameLength.alert1')))
    } else {
      callback()
    }
  }
}

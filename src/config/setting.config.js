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

const setting = {
  title: '星辉云',
  // 端口号
  devPort: '80',
  // 商户字段
  tenant: 'tenant_id',
  // 存储的AuthInfo
  authInfo: 'authInfo',
  tenantKey: 'tenant',
  // 单位/毫秒  监听token过期刷新
  expiredPeriod: 6000000,
  // 当有值时候会在登录页展示版权信息
  copyright: process.env.NODE_ENV === 'production' ? '<a href=\'http://beian.miit.gov.cn\' target="view_window">粤ICP备2022008047号-1</a>' : '版权信息',
  ossPath: 'http://127.0.0.1:9000',
  language: 'zhCn',
  languageKey: 'languageKey',
  tagViewsKey: 'tagViewsKey',
  tagViewKey: 'tagViewKey',
  aesIv: 'xhuicloud0000000'
}

export default setting

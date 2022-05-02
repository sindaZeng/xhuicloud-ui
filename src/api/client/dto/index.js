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
export const tableAttributes = {
  enableSearch: true, // 开启搜索栏 字段得添加可搜索属性!
  enableOperations: true, // 开启操作栏
  operationWidth: '250',
  columns: [
    {
      label: 'id',
      prop: 'id',
      editDisabled: true,
      createDisabled: true
    },
    {
      label: '客户端名称',
      prop: 'name',
      search: {
        placeholder: '请输入客户端名称',
        size: 'small'
      }
    },
    {
      label: '客户端id',
      prop: 'clientId'
    },
    {
      label: '客户端密钥',
      prop: 'clientSecret'
    },
    {
      label: '权限范围',
      prop: 'scope'
    },
    {
      label: '授权类型',
      prop: 'authorizedGrantTypes',
      formatter: row => {
        let authorizedGrantType = ''
        const arr = row.authorizedGrantTypes.split(',')
        for (let i = arr.length - 1; i >= 0; i--) {
          authorizedGrantType += authorizedGrantTypeMap.get(arr[i])
          if (i !== 0) {
            authorizedGrantType += '|'
          }
        }
        return authorizedGrantType
      }
    },
    {
      label: '重定向地址',
      prop: 'webServerRedirectUri'
    },
    {
      label: '令牌有效时间(单位:秒)',
      prop: 'accessTokenValidity'
    },
    {
      label: '刷新令牌有效时间(单位:秒)',
      prop: 'refreshTokenValidity'
    },
    {
      label: '自动授权',
      prop: 'autoapprove',
      formatter: row => {
        return row.autoapprove === 'true' ? '是' : '否'
      }
    }
  ]
}
// password,refresh_token,authorization_code,client_credentials,social
const authorizedGrantTypeMap = new Map()
authorizedGrantTypeMap.set('password', '密码模式')
authorizedGrantTypeMap.set('authorization_code', '授权码模式')
authorizedGrantTypeMap.set('client_credentials', '客户端模式')
authorizedGrantTypeMap.set('refresh_token', '刷新模式')
authorizedGrantTypeMap.set('social', '社交登录')

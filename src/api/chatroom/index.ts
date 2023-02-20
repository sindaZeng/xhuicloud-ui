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

import { HttpClient } from '@/utils/http'
import { RequestOptions } from '@/utils/http/xhAxiosHandler'

const API_KEY = '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'
const ENDPOINT = 'https://api.openai.com/v1/engines/davinci/jobs'
const options: RequestOptions = { withToken: false }

export function generateText(prompt: string) {
  return HttpClient.post<any>(
    {
      url: `${ENDPOINT}?prompt=${encodeURIComponent(prompt)}&max_tokens=1024`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    },
    options
  )
}

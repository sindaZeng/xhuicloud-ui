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

import { ref } from 'vue'
import { Page } from '~/axios'
import { isFunction } from '@/utils/is'

export function usePagination (getPaginationData?: () => void) {
  const page = ref<Page>({
    total: 20,
    current: 1,
    size: 10
  })

  function handleSizeChange (val: number) {
    page.value.size = val
    isFunction(getPaginationData) && getPaginationData()
  }

  function handleCurrentChange (current: number) {
    page.value.current = current
    isFunction(getPaginationData) && getPaginationData()
  }

  function handleTotalChange (total: number) {
    page.value.total = total
  }

  return {
    page,
    handleSizeChange,
    handleCurrentChange
  }
}

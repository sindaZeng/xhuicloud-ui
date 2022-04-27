<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->

<template>
  <xhui-card :bodyStyle='{ height: 140 + `px` }' class='top-card'>
    <el-avatar size='large' :src='$store.getters.userInfo.avatar' class='top-card-avatar' />
    <div class='top-card-tips'>
      <p style='font-size: 17px;font-weight: 600;margin-bottom: 10px;'>{{ getDoc() + `  ` + $store.getters.userInfo.username }}</p>
      <p>tips 占位1</p>
      <p>tips 占位2</p>
      <p>tips 占位3</p>
    </div>
  </xhui-card>
</template>

<script setup>
import { period } from '@/utils/copywriting'

const getDoc = () => {
  const doc = period()
  return doc[1] + doc[2]
}
</script>

<style lang='scss' scoped>
.top-card {
  ::v-deep(.el-card__body) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &-avatar {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
  }
  &-tips {
    flex: auto;
    width: calc(100% - 200px);
    min-width: 300px;
  }
}

</style>

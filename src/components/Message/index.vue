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
  <div class='message-box' v-infinite-scroll="load" :infinite-scroll-delay='200' :infinite-scroll-distance='50'>
    <div class='message' v-for='item in numMsg' :key='item'>
      <div class='message-body'>
        <div class='message-body-icon'>
          <xhui-svg icon='message'></xhui-svg>
        </div>
        <div class='message-body-content'>
          <p style='font-size: 18px;font-weight: 600;padding-bottom: 5px'>消费金</p>
          <p style='font-size: 15px;color: #8c939d;padding-bottom: 20px;'>消费金待领取通知</p>
          <div class='message-body-content-footer'>
            <p style='font-size: 10px;color: #021c40'>星期一</p>
            <el-button type="text">查看详情</el-button>
          </div>
        </div>
      </div>
      <div class='message-delete'>
        <el-button
          style='border-color: red'
          :icon='Close'
          size='default'
          circle
        ></el-button>
      </div>
    </div>
    <el-divider v-if='loadEnd'>我也是有底线的</el-divider>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons'
import { ref } from 'vue'

const numMsg = ref(0)

const loadEnd = ref(false)

// TODO 加载
const load = () => {
  if (numMsg.value > 10) {
    loadEnd.value = true
    return
  }
  numMsg.value += 4
}
</script>

<style lang='scss' scoped>
@import "~@/styles/message-box.scss";
</style>

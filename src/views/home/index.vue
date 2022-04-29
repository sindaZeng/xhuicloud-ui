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
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <xhui-card class='home-card'>
        <el-avatar size='large' :src='$store.getters.userInfo.avatar' class='home-card-avatar'/>
        <div class='home-card-tips'>
          <p class="home-card-tips-header">{{ getDoc() + `  ` + $store.getters.userInfo.username }}</p>
          <p>xhuicloud-ui 是基于vue3和element-plus的快速开发框架</p>
          <p>前后端分离开发神器</p>
          <p>我们的核心是数据驱动视图，它把我们从繁琐的传统crud开发中解放出来，我们只需要关注数据本身</p>
          <p>基于双向数据绑定，所以用起来更爽，更简单</p>
          <p>它不止局限于传统crud，更有表单组件等更多组件正在开发中</p>
        </div>
      </xhui-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="7">
      <xhui-card>
        <template #header>
          <span>访客记录</span>
        </template>
        <Charts :option="option"></Charts>
      </xhui-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="7">
      <xhui-card>
        <template #header>
          <span>收入记录</span>
        </template>
        <Charts :option="option"></Charts>
      </xhui-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
      <xhui-card >
        <template #header>
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <span>消息盒子</span>
            <span style="font-size: 10px">12条未读
            <xhui-svg icon="red-point"/></span>
          </div>
        </template>
        <Message/>
      </xhui-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { period } from '@/utils/copywriting'
import Charts from '@/components/Charts'
import Message from '@/components/Message'
import { ref } from 'vue'

const option = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
})

const getDoc = () => {
  const doc = period()
  return doc[1] + doc[2]
}
</script>

<style lang='scss' scoped>
@import "~@/styles/home.scss";
</style>

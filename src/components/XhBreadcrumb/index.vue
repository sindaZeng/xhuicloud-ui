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
  <div class=''>
    <el-breadcrumb class='breadcrumb'>
      <transition-group name='breadcrumb'>
        <el-breadcrumb-item v-for='(item, index) in breadcrumbData' :key='item.path'>
          <span v-if='index === breadcrumbData.length - 1' class='no-redirect'>{{ $t('menu.' + item.meta.title)
            }}</span>
          <span v-else class='redirect' @click='handleLink(item)'>{{ $t('menu.' + item.meta.title) }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

function handleLink (item: RouteLocationMatched) {
  router.push(item.path)
}

const breadcrumbData = ref<RouteLocationMatched[]>([])

function getBreadcrumbData () {
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}

watch(route, () => {
  getBreadcrumbData()
}, {
  immediate: true
})

</script>

<style lang='scss' scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: black;
    //font-weight: 600;
    cursor: pointer;
  }

}
</style>

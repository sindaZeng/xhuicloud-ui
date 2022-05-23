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
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, defineProps, ref } from 'vue'
  import { init, EChartsOption } from 'echarts'

  const chart = ref<any>()
  const props = defineProps({
    id: {
      type: String,
      default: 'xhChart'
    },
    className: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%',
      required: true
    },
    height: {
      type: String,
      default: '100%',
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  })

  onMounted(() => {
    const xhChart = init(document.getElementById(props.id) as HTMLDivElement)
    xhChart.setOption(props.option as EChartsOption)
    chart.value = xhChart
    // 自适应
    window.addEventListener('resize', () => {
      chart.value.resize()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', () => {
      chart.value.resize()
    })
  })
</script>

<style lang="scss" scoped></style>

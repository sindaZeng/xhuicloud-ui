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
  <div class="currentThemeColor" :style="{ color }">
    <div v-if="externalIcon" :style="externalIconStyle" :class="['svg-icon', 'svg-external-icon', className]"></div>
    <svg v-else :class="['svg-icon', className]" aria-hidden="true">
      <use :xlink:href="innerIcon" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, computed } from 'vue'
  import { isExternal } from '@/utils/is'
  import useStore from '@/store'

  const props = defineProps({
    // icon图标
    icon: {
      type: String,
      default: 'loadFailed'
    },
    // 图标类名
    className: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    },
    fill: {
      type: String,
      default: ''
    }
  })
  const { theme } = useStore()

  const color = computed(() => {
    if (props.fill !== '') {
      return props.fill
    }
    return theme.themeColor
  })

  const externalIcon = computed(() => isExternal(props.icon))

  /**
   * 外部图标样式
   */
  const externalIconStyle = computed(() => ({
    mask: `url(${props.icon}#star) 50% 50%`,
    '-webkit-mask': `url(${props.icon}#star) 50% 50%`
  }))

  /**
   * 内部图标样式
   */
  const innerIcon = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
  .currentThemeColor {
    display: inline-block;
  }
  .svg-icon {
    width: v-bind(width);
    height: v-bind(height);
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    -webkit-mask-size: cover !important;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    display: inline-block;
  }
</style>

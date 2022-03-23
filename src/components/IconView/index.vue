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
  <div class='icons-container'>
    <el-tabs type='border-card'>
      <el-tab-pane label='Icons'>
        <div class='grid'>
          <div v-for='item of icons' :key='item' @click='checkIcon(isElement.NO, item)'>
            <div class='icon-item'>
              <xhui-svg class='icons' :icon='item'/>
              <el-tooltip
                effect="dark"
                :content="item"
                placement="top">
                <span>{{ item }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click='checkIcon(isElement.YES, item)'>
            <div class="icon-item">
              <el-icon class='icons'>
                <component :is="item"/>
              </el-icon>
              <el-tooltip
                effect="dark"
                :content="item.name"
                placement="top">
                <span>{{ item.name }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-loading="loading" :label="item" v-for="(item, index) of customLabs" :key="item">
        <div class='grid'>
          <slot :name='`icon-item-` + index'/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import icons from './icon'
import { ref, defineEmits, defineProps } from 'vue'

defineProps({
  customLabs: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const icon = ref({
  data: '',
  isElement: '1'
})

const emits = defineEmits(['selectIcon'])

const elementIcons = ref(require('@element-plus/icons'))

const isElement = {
  NO: '1',
  YES: '0'
}

/**
 *
 * @param isElement @see isElement
 * @param item
 */
const checkIcon = (isElement, item) => {
  if (isElement === '1') {
    icon.value = { isElement: '1', data: item }
  } else {
    icon.value = { isElement: '0', data: item.name }
  }
  emits('selectIcon', icon.value)
}
</script>

<style lang='scss'>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    padding-top: 10px;
    margin: 20px;
    height: 80%;
    text-align: center;
    width: 100%;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  .icon-item:hover{
    background-color: #b5baba;
    border-radius:5px;
    .icons {
      width: 1.5em;
      height: 1.5em;
    }
  }

  span {
    display: block;
    font-size: 10px;
    margin-top: 15px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>

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
              <xhui-svg :icon='item'/>
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
              <el-icon>
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
      <el-tab-pane :label="item" v-for="(item, index) of customLabs" :key="item">
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
  }
})

const icon = ref({
  data: '',
  isElement: '1'
})

const emits = defineEmits(['update:icon'])

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
  emits('update:icon', icon.value)
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
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  .icon-item:hover{
    background-color: #b5baba;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>

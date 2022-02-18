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
  <el-dialog title='提示' :model-value='modelValue' @close='closed' width='22%'>
    <div class='content'>
      <span class='title'>主题色</span>
      <el-color-picker
        v-model="themeColor"
        :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"></el-color-picker>
    </div>
    <template #footer>
      <el-button @click='closed'>取消</el-button>
      <el-button @click='confirm' type='primary'>确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { getStyle, saveStyle } from '@/utils/theme'

const store = useStore()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const themeColor = ref(store.getters.themeColor)

const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const confirm = async () => {
  const newStyle = await getStyle(themeColor.value)
  saveStyle(newStyle)
  store.commit('theme/setThemeColor', themeColor.value)
  closed()
}
onBeforeMount(confirm)
</script>

<style lang='scss' scoped>
.content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .title {
    margin-right: 16px;
  }
}
</style>

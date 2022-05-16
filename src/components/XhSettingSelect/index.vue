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
  <el-dialog :title='$t(`msg.settingLayout`)' :model-value='modelValue' @close='closed' width='22%' append-to-body>
    <div class='content'>
      <div class='item'>
        <span class='title'>{{ $t('msg.themeColor') }}</span>
        <el-color-picker
          v-model='themeColor' style='float: right;margin-top: -10px'
          :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
          @change='confirm'></el-color-picker>
      </div>
      <div class='item'>
        <span class='title'>{{ $t('msg.sidebarLogo') }}</span>
        <el-switch v-model='sidebarLogo' class='switch' />
      </div>
      <div class='item'>
        <span class='title'>{{ $t('msg.cardStyle') }}</span>
        <el-switch v-model='cardStyle' class='switch' />
      </div>
    </div>
  </el-dialog>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, ref, onBeforeMount, computed } from 'vue'
import { getStyle, saveStyle } from '@/utils/theme'
import useStore from '@/store'

const { theme } = useStore()

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const sidebarLogo = computed({
  get () {
    return theme.showSidebarLogo
  },
  set (val: boolean) {
    theme.setSidebarLogo(val)
  }
})

const cardStyle = computed({
  get () {
    return theme.getCardStyles
  },
  set (val: boolean) {
    theme.setCardStyle(val)
  }
})
const themeColor = ref(theme.getThemeColor)

const emits = defineEmits(['update:modelValue'])

function closed () {
  emits('update:modelValue', false)
}

async function confirm () {
  const newStyle = await getStyle(themeColor.value)
  saveStyle(newStyle)
  theme.setThemeColor(themeColor.value)
  closed()
}

onBeforeMount(confirm)
</script>

<style lang='scss' scoped>
.content {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .switch {
    float: right
  }
}
</style>

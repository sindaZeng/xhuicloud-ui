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
  <el-dropdown class='international' trigger='click' @command='handleSetLang'>
    <div>
      <el-tooltip :content='$t(`msg.international`)' :effect='effect'>
        <xh-svg icon='language'></xh-svg>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled='app.getLang === `zhCn`' command='zhCn'>中文</el-dropdown-item>
        <el-dropdown-item :disabled='app.getLang === `en`' command='en'>English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts' setup>
import i18n from '@/i18n'
import { app } from '@/store'
import { defineProps } from 'vue'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator (value: string) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const handleSetLang = (lang: string) => {
  i18n.global.locale.value = lang
  app.setLang(lang)
  ElMessage.success(i18n.global.t('msg.langSuccess'))
}

</script>

<style lang='scss' scoped>

</style>

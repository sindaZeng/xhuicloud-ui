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
  <el-dialog
    v-model="dialogVisible"
    title='图标选择'
    width='40%'>
    <iconView :customLabs='customLabs' v-model:loading='loading' @selectIcon='selectIcon'>
      <template #icon-item-0>
        <div class='icon-item' v-for='item in icons' :key='item' @click='selectIcon({ isElement: `1`, data: ossPath + item.url })'>
          <xhui-svg class='icons' :icon='ossPath + item.url' />
          <el-tooltip
            effect='dark'
            :content='item.name'
            placement='top'>
            <span>{{ item.name }}</span>
          </el-tooltip>
        </div>
      </template>
    </iconView>
  </el-dialog>
</template>

<script setup>
import IconView from '@/components/IconView'
import { filePage } from '@/api/file'
import { ossPath } from '@/config'
import { loading, open, close } from '@/mixins/loading'
import { computed, defineEmits, defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
const props = defineProps({
  iconVisible: {
    type: Boolean,
    required: true,
    default: false
  }
})
const icons = ref([])

const emits = defineEmits(['update:iconVisible', 'update:icon'])

const customLabs = ref(['云端icon'])

const dialogVisible = computed({
  get: () => props.iconVisible,
  set: val => emits('update:iconVisible', val)
})

const selectIcon = icon => {
  if (icon.isElement === '0') {
    ElNotification({
      title: 'Warning',
      message: '菜单图标不允许选择Element-Plus Icon',
      type: 'warning'
    })
  } else {
    emits('update:icon', icon.data)
    dialogVisible.value = false
  }
}

const getIcons = async () => {
  open()
  const { records } = await filePage({ fileType: 'svg' })
  icons.value = records
  close()
}
getIcons()
</script>

<style lang='scss' scoped>
.icon-item {
  position: relative;

  .delete-item {
    display: none;
  }

  &:hover {
    .icons {
      width: 1.5em;
      height: 1.5em;
    }
  }
}
</style>

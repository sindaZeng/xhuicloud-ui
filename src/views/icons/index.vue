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
  <iconView :customLabs='customLabs' v-model:loading='loading'>
    <template #icon-item-0>
        <div class='icon-item'>
          <el-upload
            class="avatar-uploader"
            :headers='{ Authorization: `Bearer ` + $store.getters.token }'
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :action="uploadUrl"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class='icon-item' v-for='item in icons' :key='item'>
            <xhui-svg class='icons' :icon='ossPath + item.url'/>
            <el-tooltip
              effect="dark"
              :content="item.name"
              placement="top">
              <span>{{ item.name }}</span>
            </el-tooltip>
          <div class='delete-item'>
            <el-button
              :icon="Delete"
              @click='toDelRow(item)'
              size="default"
              circle
            ></el-button>
          </div>
        </div>
    </template>
  </iconView>
</template>

<script setup>
import IconView from '@/components/IconView'
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons'
import { filePage, delFile } from '@/api/file'
import { ossPath } from '@/config'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { loading, open, close } from '@/mixins/loading'

const imageUrl = ref('')

const icons = ref([])

const uploadUrl = ref(process.env.VUE_APP_BASE_URL + '/admin/file/upload')

const customLabs = ref(['云端icon'])

const getIcons = async () => {
  open()
  const { records } = await filePage({ fileType: 'svg' })
  icons.value = records
  close()
}

const onSuccess = (response, file, fileList) => {
  getIcons()
}

const beforeUpload = file => {
  const isSvg = file.type === 'image/svg+xml'
  if (!isSvg) {
    ElMessage({
      message: '上传头像图片只能是 svg 格式!',
      type: 'warning'
    })
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage({
      message: '上传SVG大小不能超过 2MB!',
      type: 'warning'
    })
  }
}

getIcons()

const toDelRow = row => {
  ElMessageBox.confirm(`Are you confirm to delete ${row.name} ?`)
    .then(() => {
      delFile(row.id)
    }).catch(() => {
    }).then(() => {
      ElNotification({
        title: 'Success',
        message: 'Delete success',
        type: 'success'
      })
    })
  getIcons()
}
</script>

<style lang='scss' scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 30px;
  color: #8c939d;
  width: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  display: block;
}
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
    .delete-item {
      position: absolute;
      display: inline-block;
      right: -10px;
      top: -20px;
    }
  }
}
</style>

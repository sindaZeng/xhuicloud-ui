<template>
  <div class="global-bat-tips">
    <div class="global_info">
      <label v-if="multiSelect" class="check-label">
        <input v-model="all" type="checkbox" class="checkbox" @click="selectAll" />
        <span class="checkbox_content" @click="selectAll">全选</span>
      </label>
      <span v-if="mediaIds.length > 0" class="checkbox_content">已选择{{ mediaIds.length }}项内容</span>
      <el-button
        v-if="checkPermission('sys_delete_material', false)"
        class="global_info_btn"
        style="margin-left: 12px"
        type="danger"
        :icon="Delete"
        @click="toDeleteCheckMaterial"
      />
      <el-tooltip
        v-if="checkPermission('sys_add_material', false)"
        content="支持bmp, png, jpeg, jpg, gif格式的图片"
        placement="left"
      >
        <el-upload
          v-model:file-list="files"
          class="global_info_btn"
          :action="action"
          :headers="headers"
          :data="{ type: 'image' }"
          :before-upload="beforeUpload"
          :on-success="reload"
          :show-file-list="false"
          :limit="1"
        >
          <el-button type="primary" :icon="Upload"> 上传素材 </el-button>
        </el-upload>
      </el-tooltip>
    </div>
  </div>
  <ul class="image-list">
    <li v-for="material in data" :key="material.mediaId" class="materialImage">
      <a :href="material.url" target="_blank">
        <img class="img-thumb" :src="material.url" />
      </a>
      <strong class="materialImage-title">{{ material.name }}</strong>
      <div v-if="checkPermission('sys_delete_material', false)" class="delete-item">
        <el-button :icon="Delete" size="default" circle @click="toDeleteMaterial(material)"></el-button>
      </div>
      <label :style="mediaIds.indexOf(material.mediaId) >= 0 ? checkItemStyle : ``" class="check-item">
        <input
          class="checkbox"
          type="checkbox"
          :checked="mediaIds.indexOf(material.mediaId) >= 0"
          :value="material.mediaId"
          @click="selectMeterial(material)"
        />
      </label>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import { computed, PropType, ref, watch } from 'vue'
  import { Delete, Upload } from '@element-plus/icons-vue'
  import { ElNotification, UploadUserFile } from 'element-plus'
  import { checkPermission } from '@/utils'
  import { Material } from '@/api/wechat/entity/material'

  const files = ref<UploadUserFile[]>()

  const props = defineProps({
    data: { type: Array as PropType<Material[]>, default: () => [] },
    appid: { type: String as PropType<string>, default: () => '' },
    mediaId: { type: String as PropType<string>, default: () => '' }, // 媒体id
    mediaUrl: { type: String as PropType<string>, default: () => '' }, // 图片地址
    multiSelect: { type: Boolean as PropType<boolean>, default: () => true } // 是否可以多选
  })
  const mediaIds = ref<string[]>([])
  const { headers, beforeUpload } = useUploadFiles({ fileType: ['bmp', 'png', 'jpeg', 'jpg', 'gif'] })
  const action = computed(() => import.meta.env.VITE_BASE_API + `/wechat/material/${props.appid}`)
  const emit = defineEmits(['onload', 'update:mediaId', 'update:mediaUrl', 'toDeleteMaterial', 'toDeleteCheckMaterial'])
  const all = ref(false)

  watch(
    () => mediaIds.value.length,
    () => {
      if (mediaIds.value.length != props.data.length) {
        all.value = false
      } else if (mediaIds.value.length >= props.data.length && mediaIds.value.length != 0) {
        all.value = true
      }
    },
    {
      deep: true,
      immediate: true
    }
  )

  const reload = () => {
    ElNotification({
      title: '上传成功',
      type: 'success'
    })
    emit('onload')
    files.value = []
  }

  const toDeleteMaterial = (material: Material) => {
    emit('toDeleteMaterial', material)
    mediaIds.value = []
  }

  const toDeleteCheckMaterial = () => {
    emit('toDeleteCheckMaterial', mediaIds.value)
    mediaIds.value = []
  }

  /**
   * 单个选中事件
   * @param material
   */
  const selectMeterial = (material: Material) => {
    if (!props.multiSelect) {
      mediaIds.value = []
      emit('update:mediaId', material.mediaId)
      emit('update:mediaUrl', material.url)
      mediaIds.value.push(material.mediaId)
      return
    }
    if (mediaIds.value.indexOf(material.mediaId) >= 0) {
      mediaIds.value = mediaIds.value.filter((item) => item != material.mediaId)
    } else {
      mediaIds.value.push(material.mediaId)
    }
  }

  /**
   * 选中全部
   */
  const selectAll = () => {
    if (!all.value) {
      mediaIds.value = props.data.map((x) => x.mediaId)
    } else {
      mediaIds.value = []
    }
  }

  /**
   * 被选中时的样式
   */
  const checkItemStyle = `position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        left: 10px;
        top: 10px;`
</script>
<style lang="scss" scoped>
  .image-list {
    margin: 0 auto;
    width: 100%;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .materialImage {
    width: 17%;
    margin: 0 33px 30px 0;
    cursor: pointer;
    position: relative;
    float: none;
    text-align: center;
    list-style: none;

    &:hover,
    &:focus,
    &:active {
      .delete-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        right: 10px;
        top: 10px;
      }

      .check-item {
        position: absolute;
        display: block;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        left: 10px;
        top: 10px;
      }
    }
  }

  .materialImage-title {
    display: block;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-weight: 300;
    padding: 10px 10px 0;
    line-height: 40px;
    text-align: center;
  }
  .delete-item {
    display: none;
  }

  .check-item {
    display: none;
  }
  .img-thumb {
    display: block;
    width: 100%;
    height: auto;
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    border: 2px solid transparent;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #07c160;
    }
  }

  .global-bat-tips {
    background-color: #f6f7f8;
    padding: 30px;
    margin-bottom: 20px;
  }

  .check-label {
    display: inline-block;
    margin: -4px 0 0 -8px;
    line-height: 1.6;
    color: #1a1b1c;
    font-size: 14px;
    vertical-align: middle;
    margin-right: 30px;
    cursor: pointer;
  }
  input[type='checkbox'] {
    width: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 28px;
    position: relative;
    appearance: none; //去掉原有样式
  }

  input[type='checkbox']::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }

  input[type='checkbox']:checked::before {
    content: '\2713';
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #07c160;
    color: #07c160;
    font-size: 20px;
    font-weight: bold;
  }

  .checkbox_content {
    margin-left: 10px;
  }
  .global_info_btn {
    float: right;
  }
</style>

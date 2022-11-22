<template>
  <div @click="dialogVisible = true">
    <xh-svg v-if="icon" class="menuIcon" :icon="icon"> </xh-svg>
    <el-icon v-else :size="35">
      <Plus />
    </el-icon>
    <el-dialog v-model="dialogVisible" style="margin-top: 2px" title="图标选择" width="80%" :append-to-body="true">
      <xh-icon-view v-model:loading="loading" :custom-labs="customLabs" @selectIcon="selectIcon">
        <template #icon-item-0>
          <div
            v-for="item in icons"
            :key="item.id"
            class="icon-item"
            @click="selectIcon({ isElement: `1`, data: pathPrefix + item.url })"
          >
            <xh-svg class="icons" :icon="pathPrefix + item.url" />
            <el-tooltip effect="dark" :content="item.name" placement="top">
              <span>{{ item.name }}</span>
            </el-tooltip>
          </div>
        </template>
      </xh-icon-view>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { filePage } from '@/api/upms/file'
  import { useUploadFiles } from '@/hooks/useUploadFiles'
  import { ElNotification } from 'element-plus'
  import { ref } from 'vue'
  const loading = ref<boolean>(false)
  const dialogVisible = ref<boolean>(false)
  const customLabs = ref<string[]>(['云端icon'])
  const icons = ref<SysFile[]>([])
  const emit = defineEmits(['update:icon'])
  const { pathPrefix } = useUploadFiles({})

  defineProps({
    icon: {
      type: String,
      default: ''
    }
  })

  const selectIcon = (icon: any) => {
    if (icon.isElement === '0') {
      ElNotification({
        title: 'Warning',
        message: '菜单图标不允许选择Element-Plus Icon',
        type: 'warning'
      })
    } else {
      emit('update:icon', icon.data)
      dialogVisible.value = false
    }
  }

  const getIcons = async () => {
    loading.value = true
    const { records } = await filePage({ fileType: 'svg' })
    icons.value = records
    loading.value = false
  }
  getIcons()
</script>
<style lang="scss" scoped>
  .menuIcon {
    width: 40px !important;
    height: 40px !important;
  }
</style>

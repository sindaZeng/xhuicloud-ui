<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <select-wechat-vue @after-select="onload" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card>
        <el-tabs v-model="activeName" type="border-card" class="tabs" @tab-change="onload">
          <el-tab-pane v-for="(item, index) in type" :key="index" :name="item">
            <template #label>
              <span class="custom-tabs-label">
                <XhSvg :icon="item"></XhSvg>
                <span> {{ $t('wechatMaterial.' + item) }}</span>
              </span>
            </template>
            <div class="media-list">
              <material-image
                v-if="item === `image` && wechatMpAppId"
                :data="data"
                :appid="wechatMpAppId"
                @onload="onload"
                @to-delete-material="toDeleteMaterial"
                @to-delete-check-material="toDeleteCheckMaterial"
              ></material-image>
              <material-voice
                v-if="item === `voice` && wechatMpAppId"
                :data="data"
                :appid="wechatMpAppId"
                @to-delete-material="toDeleteMaterial"
              ></material-voice>
              <material-video
                v-if="item === `video` && wechatMpAppId"
                :data="data"
                :appid="wechatMpAppId"
                @to-delete-material="toDeleteMaterial"
              ></material-video>
            </div>
            <el-pagination
              v-model:current-page="page.current"
              v-model:page-size="page.size"
              :total="page.total"
              @size-change="onload"
              @current-change="onload"
            />
          </el-tab-pane>
        </el-tabs>
      </xh-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { Pagination } from '@/components/XhTable/pagination'
  import { ref, reactive } from 'vue'
  import selectWechatVue from '../components/selectWechat.vue'
  import materialImage from './components/image.vue'
  import materialVoice from './components/voice.vue'
  import materialVideo from './components/video.vue'
  import { deleteMaterial, materialPage } from '@/api/wechat/material'
  import { ElMessageBox } from 'element-plus'
  import { isEmpty, isNullOrUnDef } from '@/utils/is'
  import { Material } from '@/api/wechat/entity/material'

  const activeName = ref('image')
  const type = ['image', 'video', 'voice']
  const page = reactive<Pagination>({ current: 1, size: 10, total: 0 })
  const data = ref<Material[]>([])
  const wechatMpAppId = ref<string>('')

  /**
   * 获取列表
   */
  const onload = async (wechatSummary?: WeChatSummary) => {
    if (!isNullOrUnDef(wechatSummary) && !isNullOrUnDef(wechatSummary.appId)) {
      wechatMpAppId.value = wechatSummary.appId
    }
    if (isNullOrUnDef(wechatMpAppId.value) || isEmpty(wechatMpAppId.value)) {
      return
    }
    data.value = []
    const response = await materialPage(wechatMpAppId.value, { ...page, type: activeName.value })
    page.total = response.total
    data.value = response.records
    return response.records
  }

  /**
   * 删除指定素材
   * @param media
   */
  const toDeleteMaterial = (media: Material) => {
    ElMessageBox.confirm('确认删除 ' + media.name + ' ?').then(() => {
      return deleteMaterial(wechatMpAppId.value, [media.mediaId]).then(() => {
        const timer = setTimeout(() => {
          onload()
          clearTimeout(timer)
        }, 1000)
      })
    })
  }

  /**
   * 删除被选中素材
   * @param media
   */
  const toDeleteCheckMaterial = (mediaIds: string[]) => {
    ElMessageBox.confirm('确认删除选中的素材?').then(() => {
      return deleteMaterial(wechatMpAppId.value, mediaIds).then(() => {
        const timer = setTimeout(() => {
          onload()
          clearTimeout(timer)
        }, 1000)
      })
    })
  }
</script>
<style lang="scss" scoped>
  .tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .tabs .custom-tabs-label .svg-icon {
    vertical-align: middle;
  }
  .tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
  .media-list {
    overflow-y: visible;
  }
</style>

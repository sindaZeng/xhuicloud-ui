<!-- 单个图文消息 -->
<template>
  <div class="container margin">
    <div class="image-container">
      <img
        v-if="props.draft.content.newsItem[0].thumbUrl"
        class="first-image"
        :src="draft.content.newsItem[0].thumbUrl"
      />
    </div>
    <div class="context">
      <span class="title__wrp">
        <a :href="draft.content.newsItem[0].url" target="_blank" class="title">
          <span>{{ draft.content.newsItem[0].title }}</span>
        </a>
      </span>
      <p title="正文" class="desc">{{ draft.content.newsItem[0].digest }}</p>
      <p title="更新时间" class="desc updateTime">更新于 {{ formatDateTime(draft.updateTime) }}</p>
    </div>
    <div v-if="permission.delBtn" class="common-item delete">
      <el-tooltip content="删除" placement="top">
        <el-button :icon="Delete" size="default" circle @click="$emit('toDeleteDraft', draft.mediaId)"></el-button>
      </el-tooltip>
    </div>
    <div v-if="permission.editBtn" class="common-item edit">
      <el-tooltip content="编辑" placement="top">
        <el-button
          :icon="Edit"
          size="default"
          circle
          @click="$emit('toEditDraft', draft.content.newsItem[0], draft.mediaId)"
        ></el-button>
      </el-tooltip>
    </div>
    <div v-if="permission.publishBtn" class="common-item publish">
      <el-tooltip content="发布" placement="top">
        <el-button :icon="Promotion" size="default" circle @click="$emit('toPublishDraft', draft.mediaId)"> </el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { formatDateTime } from '@/utils/date'
  import { inject, PropType } from 'vue'
  import { Delete, Edit, Promotion } from '@element-plus/icons-vue'

  const props = defineProps({
    draft: { type: Object as PropType<Draft>, default: () => ({}) }
  })

  defineEmits(['toDeleteDraft', 'toEditDraft', 'toPublishDraft'])

  const permission = inject('permission') as PermissionsBtn
</script>
<style lang="scss" scoped></style>

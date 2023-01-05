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
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { formatDateTime } from '@/utils/date'
  import { PropType } from 'vue'
  const props = defineProps({
    draft: { type: Object as PropType<Draft>, default: () => ({}) }
  })
</script>
<style lang="scss" scoped></style>

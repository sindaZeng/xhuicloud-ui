<!-- 多图文 -->
<template>
  <div class="container">
    <div class="image-container mult select">
      <img v-if="draft.content.newsItem[0].thumbUrl" class="first-image" :src="draft.content.newsItem[0].thumbUrl" />
      <div class="img-notice">
        <span class="title__wrp">
          <a :href="draft.content.newsItem[0].url" target="_blank" class="title white">
            <span>{{ draft.content.newsItem[0].title }}</span>
          </a>
        </span>
      </div>
    </div>
  </div>
  <div class="sub-card-container">
    <div class="sub-image-container">
      <img
        v-if="props.draft.content.newsItem[0].thumbUrl"
        class="first-image"
        :src="draft.content.newsItem[0].thumbUrl"
      />
    </div>
    <div class="title-container">
      <a href="javascript:void(0);" class="sub-title">
        <span>图文</span>
      </a>
    </div>
  </div>
  <p title="更新时间" class="desc updateTime">更新于 {{ formatDateTime(draft.updateTime) }}</p>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue'
  import { formatDateTime } from '@/utils/date'

  const props = defineProps({
    draft: { type: Object as PropType<Draft>, default: () => ({}) }
  })
</script>
<style lang="scss" scoped>
  .mult {
    height: 100px;
  }
  .img-notice {
    position: absolute;
    width: 100%;
    height: 54px;
    bottom: 0;
    background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.3)));
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.3));
    color: #fff;
    line-height: 22px;
  }
  .white {
    color: #fff;
  }
  .select {
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #07c160;
    }
  }
  .sub-card-container {
    padding: 16px;
    position: relative;
  }
  .sub-image-container {
    float: right;
    width: 54px;
    height: 54px;
    background-size: cover;
    background-color: #e3e4e5;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    margin-left: 12px;
  }
  .title-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 54px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .sub-title {
    font-weight: 400;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    color: #1a1b1c;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>

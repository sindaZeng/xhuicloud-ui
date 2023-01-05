<!-- 公共图文操作按钮组 -->
<template>
  <div v-if="permission.delBtn" class="common-item delete">
    <el-tooltip content="删除" placement="top">
      <el-button :icon="Delete" size="default" circle @click="$emit('toDeleteDraft', draft.mediaId)"></el-button>
    </el-tooltip>
  </div>

  <div v-if="permission.publishBtn" class="common-item publish">
    <el-tooltip content="发布" placement="top">
      <el-button :icon="Promotion" size="default" circle @click="$emit('toPublishDraft', draft.mediaId)"> </el-button>
    </el-tooltip>
  </div>

  <div v-if="permission.editBtn" class="common-item edit">
    <el-tooltip content="编辑" placement="top">
      <el-button :icon="Edit" size="default" circle @click="$emit('toCreateOrEditDraft', draft)"></el-button>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue'
  import { Delete, Edit, Promotion } from '@element-plus/icons-vue'
  import { inject } from 'vue'

  const permission = inject('permission') as PermissionsBtn

  defineProps({
    draft: { type: Object as PropType<Draft>, default: () => ({}) }
  })
  defineEmits(['toDeleteDraft', 'toPublishDraft', 'toCreateOrEditDraft'])
</script>
<style lang="scss" scoped></style>

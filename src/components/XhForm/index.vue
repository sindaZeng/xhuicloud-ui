<template>
  <el-form class="table-form" v-bind="getBindValue">
    <el-row>
      <el-col v-for="(item, index) in getBindValue.schemas" :key="index" :xl="4" :lg="8" :md="10" :sm="10" :xs="16">
        <el-form-item v-bind="item">
          <el-input v-model="modelRef[item.prop]" :placeholder="item.placeholder" />
        </el-form-item>
      </el-col>
      <el-button type="primary">Primary</el-button>
      <el-button type="primary" link
        >收起<el-icon class="el-icon--right"><ArrowUp /></el-icon
      ></el-button>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { ArrowUp } from '@element-plus/icons-vue'
  import { useAttrs } from 'vue'
  import { formProps } from './form'
  import { useFormState } from './hooks/useFormState'

  const attrs = useAttrs()

  const props = defineProps(formProps)

  const { modelRef, getBindValue } = useFormState({ props, attrs })
</script>
<style lang="scss" scoped></style>

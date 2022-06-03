<template>
  <el-form class="table-form" v-bind="formPropsRef" :model="modelRef" :class="className">
    <el-row>
      <el-col v-for="(item, index) in formPropsRef.schemas" :key="index" :xl="4" :lg="8" :md="10" :sm="10" :xs="16">
        <el-form-item v-bind="item">
          <el-input v-model="modelRef[item.prop as keyof typeof item.prop]" :placeholder="item.placeholder" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { formProps } from './form'
  import { useFormState } from './hooks/useFormState'

  const props = defineProps(formProps)
  const { formPropsRef, modelRef } = useFormState({ props })
</script>
<style lang="scss" scoped></style>

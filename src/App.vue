<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  import useStore from '@/store'

  const currentLocale = computed(() => {
    const { app } = useStore()
    return app.getLang === 'en' ? en : zhCn
  })
</script>
<style lang="scss"></style>

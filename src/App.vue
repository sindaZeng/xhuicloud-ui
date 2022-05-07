
<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { app } from '@/store'
const currentLocale = computed(() => {
  return app.lang === 'en' ? en : zhCn
})
</script>
<style>

</style>

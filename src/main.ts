import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import XhComponents from '@/components'

import { createPinia } from 'pinia'
import i18n from '@/i18n'
import 'virtual:svg-icons-register' // 导入svg注册脚本

import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/index.scss' // global css

import '@/permission'
import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App)

// 全局注册el-icon
Object.keys(ElIcons).forEach((key) => {
  app.component(key, (ElIcons as any)[key])
})

app.use(createPinia())
app.use(XhComponents)
app.use(router)
app.use(i18n)
app.mount('#app')

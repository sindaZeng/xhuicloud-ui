import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './router/permission'

import i18n from './i18n'
import 'virtual:svg-icons-register' // 导入svg注册脚本
import componentsInstall from '@/components'

import 'element-plus/theme-chalk/src/index.scss'
import '@/styles/index.scss' // global css

const app = createApp(App)
app.component('')
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(componentsInstall)
app.mount('#app')

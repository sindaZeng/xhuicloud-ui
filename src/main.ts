import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import 'virtual:svg-icons-register' // 导入svg注册脚本
import componentsInstall from '@/components'
const app = createApp(App)
app.component('')
app.use(store)
app.use(componentsInstall)
app.mount('#app')

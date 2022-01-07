import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss' // global css
import installXHuiIcon from './icons' // icon

const app = createApp(App)
installElementPlus(app)
installXHuiIcon(app)
app.use(router).use(store).mount('#app')

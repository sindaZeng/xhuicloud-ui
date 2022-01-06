import { createRouter, createWebHashHistory } from 'vue-router'
const commonsRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: commonsRoutes
})
export default router

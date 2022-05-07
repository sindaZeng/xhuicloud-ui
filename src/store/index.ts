import { createPinia } from 'pinia'
import { useUserStore } from './modules/user'
import { useThemeStore } from './modules/theme'
import { useAppStore } from './modules/app'
const store = createPinia()
const user = useUserStore(store)
const theme = useThemeStore(store)
const app = useAppStore(store)
export { store, user, theme, app }

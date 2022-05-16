import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  theme: useThemeStore()
})

export default useStore

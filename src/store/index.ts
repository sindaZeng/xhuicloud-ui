import useUserStore from '@/store/modules/user'
import useAppStore from '@/store/modules/app'
import useThemeStore from '@/store/modules/theme'
import usePermissionStore from '@/store/modules/permission'

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  theme: useThemeStore(),
  permission: usePermissionStore()
})

export default useStore

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path, { resolve } from 'path'
import pkg from './package.json'
import dayjs from 'dayjs'

const { dependencies, devDependencies, name, version } = pkg

const APP_INFO = {
  pkg: { dependencies, devDependencies, name, version },
  buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;'
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  define: {
    global: {},
    APP_INFO: JSON.stringify(APP_INFO)
  },
  plugins: [
    vue(),
    vueJsx(),
    vueI18n({
      include: [resolve('src/i18n/locale/**')]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 需要nginx开启 gzip_static
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
    // 依赖分析
    // visualizer({
    //   emitFile: false,
    //   filename: 'stats.html', //分析图生成的文件名
    //   open: false //如果存在本地服务端口，将在打包后自动展示
    // })
  ],
  optimizeDeps: {
    include: [
      'vue',
      'pinia',
      'sass',
      'lodash',
      'vue-router',
      '@vue/runtime-core',
      '@vue/shared',
      'crypto-js',
      'element-plus/es',
      'element-plus/es/locale/lang/zh-cn',
      'element-plus/es/locale/lang/en',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/color-picker/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/notification/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/infinite-scroll/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/config-provider/style/css',
      'element-plus/es/components/container/style/css',
      'element-plus/es/components/main/style/css',
      'element-plus/es/components/header/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/drawer/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/popover/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/radio-button/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/collapse/style/css',
      'element-plus/es/components/collapse-item/style/css',
      'element-plus/es/components/backtop/style/css',
      'element-plus/es/components/avatar/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/empty/style/css',
      'element-plus/es/components/descriptions/style/css',
      'element-plus/es/components/descriptions-item/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/space/style/css',
      'element-plus/es/components/alert/style/css',
      'element-plus/es/components/cascader/style/css',
      'element-plus/es/components/tree/style/css'
    ]
  }
})

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 端口 */
  readonly VITE_PORT: number
  /** 路由模式 */
  readonly VITE_ROUTER_HISTORY: string
  /** 接口地址 */
  readonly VITE_BASE_API: string
  /** 图片oss地址 当没有domain时自动拼接 */
  readonly VITE_OSS_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

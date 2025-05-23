declare namespace Env {
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  interface ImportMeta extends ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_DESC: string

    readonly VITE_AUTH_ROUTER_MODE: 'dynamic' | 'static'
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE?: CommonType.YesOrNo
    readonly VITE_BASE_URL: string
    readonly VITE_CONSTANT_ROUTER_MODE: 'dynamic' | 'static'
    readonly VITE_HTTP_PROXY: CommonType.YesOrNo
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon'
    readonly VITE_ICON_PREFIX: 'icon'
    readonly VITE_ICONIFY_URL: string
    readonly VITE_MENU_ICON: string
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo

    readonly VITE_ROUTER_HISTORY_MODE: RouterHistoryMode
    readonly VITE_SERVICE_BASE_URL: string
    readonly VITE_SERVICE_EXPIRED_TOKEN_CODES: string
    readonly VITE_SERVICE_MODAL_LOGOUT_CODES: string
    readonly VITE_SERVICE_SUCCESS_CODE: string
    readonly VITE_SOURCE_MAP?: CommonType.YesOrNo
    readonly VITE_STATIC_SUPER_ROLE: string
    readonly VITE_STORAGE_PREFIX: string
  }
}

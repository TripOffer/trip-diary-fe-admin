declare namespace StorageType {
  interface Session {
    themeColor: string
  }
  type ThemeMode = import('ahooks/lib/useTheme').ThemeMode

  interface Local {
    themeMode: ThemeMode
    lang: App.I18n.LangType
    themeColor: string
    userInfo: Api.Auth.UserInfo
    refreshToken: string
  }
}

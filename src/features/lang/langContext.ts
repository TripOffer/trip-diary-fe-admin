import { createContext, useContext } from 'react'

export type LangContextType = {
  locale: App.I18n.LangType
  localeOptions: App.I18n.LangOption[]
  setLocale: (locale: App.I18n.LangType) => void
}

export const LangContext = createContext<LangContextType>({
  locale: (localStorage.getItem('lang') || 'zh-CN') as App.I18n.LangType,
  localeOptions: [
    {
      label: '中文',
      key: 'zh-CN',
    },
    {
      label: 'English',
      key: 'en-US',
    },
  ] as App.I18n.LangOption[],
  setLocale: () => {},
})

export function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return context
}

import type { FC, PropsWithChildren } from 'react'
import { setLng } from '@/locales'
import { LangContext } from '@/features/lang/langContext.ts'
import { useState } from 'react'

const localeOptions = [
  {
    name: '中文',
    key: 'zh-CN',
  },
  {
    name: 'English',
    key: 'en-US',
  },
] satisfies App.I18n.LangOption[]

const getLang = (): App.I18n.LangType => {
  const lang = localStorage.getItem('lang')
  return lang === 'zh-CN' || lang === 'en-US' ? lang : 'zh-CN'
}

const LangProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<App.I18n.LangType>(getLang())

  function changeLocale(lang: App.I18n.LangType) {
    setLng(lang)
    setLocale(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <LangContext value={{ locale, localeOptions, setLocale: changeLocale }}>{children}</LangContext>
  )
}

export default LangProvider

import { locale } from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

export function setDayjsLocale(lang: App.I18n.LangType = 'zh-CN') {
  const localMap = {
    'zh-CN': 'zh-cn',
    'en-US': 'en',
  } satisfies Record<App.I18n.LangType, string>
  const l = lang || localStorage.getItem('lang') || 'zh-CN'
  locale(localMap[l])
}

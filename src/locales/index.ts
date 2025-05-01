import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { localStg } from '@/utils/storage'
import locales from './locale'

export const reactI18nextInstance = i18n.use(initReactI18next)

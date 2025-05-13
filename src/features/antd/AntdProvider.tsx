import type { WatermarkProps } from 'antd'
import type { PropsWithChildren } from 'react'
import { antdLocales } from '@/locales/antd.ts'
import { ConfigProvider, Watermark } from 'antd'

import { useLang } from '@/features/lang'

function AntdConfig({ children }: PropsWithChildren) {
  const { lang } = useLang()
  return (
    <ConfigProvider
      button={{ classNames: { icon: 'align-1px text-icon' } }}
      card={{ styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px' } } }}
      locale={antdLocales[lang]}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdConfig

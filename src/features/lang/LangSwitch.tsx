import { useLang } from '@/features/lang/langContext.ts'
import type { FC } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'antd'
import NavIcon from "@/component/icon/NavIcon.tsx";

interface Props {
  className?: string
  showTooltip?: boolean
}

const LangSwitch: FC<Props> = memo(({ className, showTooltip = true }) => {
  const { t } = useTranslation()
  const { locale, localeOptions, setLocale } = useLang()
  const tooltipContent = showTooltip ? t('icon.lang') : ''
  function changeLocale({ key }: { key: string }) {
    setLocale(key as App.I18n.LangType)
    location.reload()
  }
  return (
    <Dropdown menu={{ items: localeOptions, onClick: changeLocale, selectedKeys: [locale] }}>
      <div>
        <NavIcon
          onClick={() => {}}
          icon="heroicons:language"
          className={className}
          iconText={tooltipContent}
        />
      </div>
    </Dropdown>
  )
})

export default LangSwitch

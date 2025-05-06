import { Badge, Button, Modal, Popover, message } from 'antd'
import { useNavigate } from 'react-router'
import useAuthStore from '@/store/auth.ts'
import NavIcon from '@/component/icon/NavIcon.tsx'
import { $t } from '@/locales'
import logo from '@/assets/react.svg'
import LangSwitch from "@/features/lang/LangSwitch.tsx";

const NavBar = () => {
  const navigate = useNavigate()
  const { resetAuth } = useAuthStore()

  const handleLogout = () => {
    Modal.confirm({
      title: $t('common.logout'),
      content: $t('common.logoutConfirm'),
      okText: $t('common.yesOrNo.yes'),
      cancelText: $t('common.yesOrNo.no'),
      onOk: () => {
        localStorage.removeItem('user_token')
        resetAuth()
        message.success($t('common.logoutSuccess'))
        navigate('/auth/login')
      },
    })
  }

  const userContent = (
    <div className="p-2">
      <Button type="primary" danger onClick={handleLogout}>
        {$t('common.logout')}
      </Button>
    </div>
  )

  return (
    <div className="w-full bg-white px-10 py-2 flex flex-row justify-between shadow">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-8 mr-2" />
        <p className="text-2xl font-bold text-black">{$t('common.title')}</p>
      </div>

      <div className="flex flex-row gap-8 mr-20">
        <LangSwitch className="hover:text-blue-500 transition-colors" />
        <Popover content={userContent} placement="bottom" trigger="hover" arrow={false}>
          <div>
            <NavIcon
              onClick={() => navigate('/user')}
              icon="mdi:account-circle-outline"
              iconText={$t('common.userCenter')}
              className="hover:text-blue-500 transition-colors"
            />
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default NavBar

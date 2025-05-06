import Api from '@/service/api'
import { LoginReq } from '@/service/api/auth/types.ts'
import { Icon } from '@iconify/react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/auth.ts'
import { useTokenStore } from '@/store/token.ts'
import styles from '@/pages/auth/login.module.scss'
import { FC, useState } from 'react'
import { $t } from '@/locales'

const LoginPage = () => {
  const navigate = useNavigate()
  const { loading, setLoading } = useState(false)
  const { setEmail, setToken, setUser, ...tokenData } = useTokenStore()
  const { form } = Form.useForm()
  const { setAuth } = useAuthStore()

  const onFinish = async (values: LoginReq & { remember: boolean }) => {
    try {
      setLoading(true)
      const { remember, ...loginData } = values
      const response = await Api.authApi.login(loginData)
      if (response && response.data) {
        const { token, user } = response.data
        setToken(token)
        setUser(JSON.stringify(user))

        if (remember) {
          setEmail(values.email)
        } else {
          setEmail('')
        }

        setAuth({
          ...user,
        })

        message.success($t('page.login.common.loginSuccess'))
        navigate('/')
      }
    } catch (error) {
      message.error($t('request.logoutMsg'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>{$t('page.login.common.welcomeBack')}</h1>
        <Form
          form={form}
          name="login"
          initialValues={{
            remember: false,
            email: localStorage.getItem('email') || '',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: $t('form.required'),
              },
              {
                type: 'email',
                message: $t('form.email.invalid'),
              },
            ]}
          >
            <Input
              prefix={<Icon icon="mdi:email-outline" />}
              placeholder={$t('form.email.required')}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: $t('form.required'),
              },
            ]}
          >
            <Input.Password
              prefix={<Icon icon="mdi:lock-outline" />}
              placeholder={$t('form.pwd.required')}
              size="large"
              iconRender={
                ((visible: boolean) =>
                  visible ? (
                    <Icon icon="mdi:eye-outline" />
                  ) : (
                    <Icon icon="mdi:eye-off-outline" />
                  )) as (visible: boolean) => React.ReactNode
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.loginButton}
              loading={loading}
              size="large"
            >
              {$t('page.login.common.login')}
            </Button>
          </Form.Item>

          <div className={styles.registerLink}>
            {$t('page.login.pwdLogin.register')}{' '}
            <a onClick={() => navigate('/auth/register')}>{$t('page.login.common.Register')}</a>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage

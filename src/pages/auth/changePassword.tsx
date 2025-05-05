import React, {FC, useState} from 'react'
import {useNavigate} from'react-router-dom'
import {Button, Form, Input, message} from'antd'
import styles from'./changePassword.module.scss'
import {$t} from'@/locales'
import Api from'@/service/api'
import {ChangePasswordReq} from'@/service/api/auth/types'
import {Icon} from "@iconify/react";

const ChangePasswordPage: FC = () => {
    const navigate = useNavigate()
    const [sendingCode, setSendingCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [form] = Form.useForm()

    const startCountdown = () => {
        setCountdown(60)
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const handleSendCode = async () => {
        try {
            const email = form.getFieldValue('email')
            if (!email) {
                message.error($t('form.email.required'))
                return
            }

            const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRule.test(email)) {
                message.error($t('form.email.invalid'))
                return
            }
            setSendingCode(true)
            const response = await Api.authApi.sendCode({email})
            if (response && response.data) {
                message.success($t('page.login.codeLogin.sendCodeSuccess'))
                startCountdown()
            }
        } catch (error) {
            message.error($t('form.send'))
        } finally {
            setSendingCode(false)
        }
    }

    const onFinish = async (values: ChangePasswordReq & { confirmPassword: string }) => {
        try {
            setLoading(true)
            const {confirmPassword, ...changePasswordData} = values
            const response = await Api.authApi.changePassword(values)
            if (response && response.data) {
                message.success($t('page.login.resetPwd.success'))
                navigate('/auth/login')
            }
        } catch (error) {
            message.error($t(error.message || $t('request.logout')))
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.loginForm}>{$t('page.login.resetPwd.title')}</h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    name={'changePasswordForm'}
                >
                    <Form.Item
                        name={'email'}
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
                            prefix={<i className="iconfont icon-email"/>}
                            placeholder={$t('form.email.required')}
                            size={'large'}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'code'}
                        rules={[
                            {
                                required: true,
                                message: $t('form.required'),
                            },
                        ]}
                        >
                        <div style={{display: "flex"}}>
                            <Input
                                prefix={<i className="iconfont icon-code"/>}
                                placeholder={$t('form.code.required')}
                                size={'large'}
                                style={{flex: 1}}
                            />
                            <Button
                                type={'primary'}
                                onClick={handleSendCode}
                                disabled={sendingCode || countdown > 0}
                                loading={sendingCode}
                                style={{marginLeft: 8, width: 120}}
                            >
                                {sendingCode || countdown > 0
                                    ? `${countdown}s`
                                    : $t('form.send')}
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item
                        name={'newPassword'}
                        rules={[
                            {
                                required: true,
                                message: $t('form.required'),
                            },
                            {
                                min: 6,
                                message: $t('form.pwd.invalid'),
                            },
                            {
                                max: 16,
                                message: $t('form.pwd.invalid'),
                            },
                            {
                                pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,16}$/,
                                message: $t('form.pwd.invalid'),
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<i className="iconfont icon-password"/>}
                            placeholder={$t('form.pwd.required')}
                            size={'large'}
                            iconRender={visible =>
                                visible ? <Icon icon="mdi:eye-outline" /> : <Icon icon="mdi:eye-off-outline" />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name={'confirmPassword'}
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: $t('form.required'),
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error($t('form.confirmPwd.invalid')))
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            prefix={<Icon icon="mdi:lock-outline" />}
                            placeholder={$t('form.confirmPwd.required')}
                            size={'large'}
                            iconRender={visible =>
                                visible? <Icon icon="mdi:eye-outline" /> : <Icon icon="mdi:eye-off-outline" />
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type={'primary'}
                            htmlType={'submit'}
                            size={'large'}
                            block
                            loading={loading}
                            className={styles.loginButton}
                            >
                            {$t('page.login.resetPwd.confirm')}
                        </Button>
                    </Form.Item>

                    <div className={styles.registerLink}>
                        <a onClick={()=>navigate("/auth/register")}>{$t('page.login.common.back')}</a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ChangePasswordPage
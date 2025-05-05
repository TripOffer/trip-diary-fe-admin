import React, {FC, useState} from "react";
import {Button, Form, Input, message} from "antd";
import {useNavigate} from "react-router-dom";
import Api from "@/service/api";
import {RegisterReq} from "@/service/api/auth/types.ts";
import {Icon} from "@iconify/react";
import styles from './login.module.scss'
import {$t} from "@/locales";

const Register: FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [sendingCode, setSendingCode] = useState(false)
    const [form] = Form.useForm()
    const [countdown, setCountdown] = useState(60)

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
            if(response && response.data) {
                message.success($t('page.login.sendCodeSuccess'))
                startCountdown()
            }
        } catch (error) {
            message.error($t('form.send'))
            console.error(error)
        } finally {
            setSendingCode(false)
        }
    }

    const onFinish = async (values: RegisterReq) => {
        try {
            setLoading(true)
            const response = await Api.authApi.register(values)
            if(response && response.data) {
                message.success($t('page.register.success'))
                navigate('/auth/login')
            }
        } catch (error) {
            message.error($t('request.logout'))
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.title}>{$t('page.register.title')}</h1>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: $t('form.required')
                            },
                            {
                                type: 'email',
                                message: $t('form.email.invalid')
                            }
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
                                message: $t('form.required')
                            },
                            {
                                min: 6,
                                message: $t('form.pwd.invalid')
                            },
                            {
                                max: 16,
                                message: $t('form.pwd.invalid')
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/,
                                message: $t('form.pwd.invalid')
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<Icon icon="mdi:lock-outline" />}
                            placeholder={$t('form.pwd.required')}
                            size="large"
                            iconRender={visible =>
                                visible ? <Icon icon="mdi:eye-outline" /> : <Icon icon="mdi:eye-off-outline" />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: $t('form.required')
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
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
                            size="large"
                            iconRender={visible =>
                                visible? <Icon icon="mdi:eye-outline" /> : <Icon icon="mdi:eye-off-outline" />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: $t('form.required')
                            },
                        ]}
                    >
                        <div style={{display: "flex"}}>
                            <Input
                                prefix={<Icon icon="mdi:email-outline" />}
                                placeholder={$t('form.code.required')}
                                size="large"
                                style={{flex: 1}}
                            />
                            <Button
                                type="primary"
                                size="large"
                                disabled={countdown > 0 || sendingCode}
                                loading={sendingCode}
                                onClick={handleSendCode}
                                style={{marginLeft: 8, width: 120}}
                            >
                                {countdown > 0 ? `${countdown}s` : $t('page.codeLogin.getCode')}
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className={styles.loginButton}
                            loading={loading}
                            block
                        >
                            {$t('page.common.Register')}
                        </Button>
                    </Form.Item>

                    <div className={styles.registerLink}>
                        {$t('')} <a onClick={() => navigate('/auth/login')}>{$t('page.pwdLogin.title')}</a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register
import { Avatar, Button, Card, Radio, Divider, Form, Input, message, Spin, Modal } from 'antd'
import { useEffect, useState } from 'react'
import useAuthStore from '@/store/auth.ts'
import { useNavigate } from 'react-router-dom'
import Api from '@/service/api'
import { UserInfoData } from '@/service/api/user/types.ts'
import { $t } from '@/locales'
import { DeleteOutlined, EditOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons'

const UserPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { username, email, bio, gender, avatar, setAuth, resetAuth } = useAuthStore()
  const navigate = useNavigate()
  const options = [
    {
      label: $t('page.manage.user.gender.male'),
      value: 'male',
    },
    {
      label: $t('page.manage.user.gender.female'),
      value: 'female',
    },
    {
      label: $t('page.manage.user.gender.other'),
      value: 'secret',
    },
  ]

  const parseGender = (gender: string) => {
    switch (gender) {
      case 'male':
        return $t('page.manage.user.gender.male')
      case 'female':
        return $t('page.manage.user.gender.female')
      case 'secret':
        return $t('page.manage.user.gender.other')
    }
  }

  const convertGender = (gender: string) => {
    switch (gender) {
      case '男':
      case 'male':
        return 'male'
      case '女':
      case 'female':
        return 'female'
      case '秘密':
      case 'secret':
        return 'secret'
      default:
        return 'secret'
    }
  }

  const fetchUserInfo = async () => {
    setLoading(true)
    try {
      const userInfo = await Api.userApi.getUserInfo()
      // console.log(userInfo)
      setAuth({
        userId: userInfo.id,
        username: userInfo.name,
        email: userInfo.email,
        bio: userInfo.bio,
        avatar: userInfo.avatar, // 假设头像字段名为 avatar
        role: userInfo.role,
        gender: parseGender(userInfo.gender),
        birthday: userInfo.birthday,
        createdAt: userInfo.createAt,
        updatedAt: userInfo.updateAt,
      })
    } catch (error) {
      message.error($t('request.logout'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      username,
      bio,
      gender,
    })
  }, [username, bio, gender, form])

  const handleSubmit = async (values: {
    username: string
    bio: string
    gender: string
    birthday: Date
  }) => {
    setLoading(true)
    try {
      await Api.userApi.updateUserInfo({
        name: values.username,
        bio: values.bio,
        gender: convertGender(values.gender),
        birthday: values.birthday,
      })
      setAuth({
        username: values.username,
        bio: values.bio,
        gender: parseGender(values.gender),
        birthday: values.birthday,
      })
      message.success($t('common.modifySuccess'))
    } catch (error) {
      message.error($t('request.logout'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        <UserOutlined className="mr-2" />
        {$t('common.userCenter')}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card
          title={
            (
              <span className="text-xl font-semibold text-gray-700">{$t('common.userInfo')}</span>
            ) as React.ReactNode
          }
          className="flex-1 shadow-md hover:shadow-lg transition-shadow duration-300"
          style={{ borderRadius: '12px', overflow: 'hidden' }}
        >
          <Spin spinning={loading}>
            <div className="flex flex-col items-center mb-6">
              <Avatar
                size={110}
                src={avatar}
                icon={(<UserOutlined />) as React.ReactNode}
                className="mb-5 bg-blue-500 shadow-md hover:scale-105 transition-all duration-300"
              />
              <p className="text-center text-xl font-medium mb-2">{username}</p>
              <p className="text-center text-gray-500 mb-3">{email}</p>

              <div className="bg-blue-50 rounded-lg px-6 py-3 mb-5 w-full text-center">
                <p className="text-blue-700 font-medium">
                  {$t('page.manage.user.userGender')}
                  <span className="text-lg">{gender}</span>
                </p>
              </div>
              <Divider className="my-4">{$t('page.manage.user.bio')}</Divider>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full">
                <p className="text-center text-gray-500 italic">
                  {bio || $t('page.manage.userDetail.explain')}
                </p>
              </div>
            </div>
          </Spin>
        </Card>

        <Card
          title={
            (
              <span className="text-xl font-semibold text-gray-700">
                <EditOutlined className="mr-2" />
                {$t('page.manage.user.editUser')}
              </span>
            ) as React.ReactNode
          }
          className="flex-1 shadow-md hover:shadow-lg transition-shadow duration-300"
          style={{ borderRadius: '12px', overflow: 'hidden' }}
        >
          <Spin spinning={loading}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ username, bio, gender }}
              className="p-2"
            >
              <Form.Item
                name="username"
                label={
                  (
                    <span className="text-lg font-medium text-gray-700">
                      {$t('page.manage.user.userName')}
                    </span>
                  ) as React.ReactNode
                }
                rules={[{ required: true, message: $t('form.required') }]}
              >
                <Input
                  placeholder={$t('page.manage.user.form.userName')}
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label={
                  (
                    <span className="text-lg font-medium text-gray-700">
                      {$t('page.manage.user.userGender')}
                    </span>
                  ) as React.ReactNode
                }
              >
                <Radio.Group
                  block
                  optionType="button"
                  options={options}
                  size="large"
                  onChange={e => form.setFieldValue('gender', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="bio"
                label={
                  (
                    <span className="text-lg font-medium text-gray-700">
                      {$t('page.manage.user.bio')}
                    </span>
                  ) as React.ReactNode
                }
              >
                <Input.TextArea
                  placeholder={$t('page.manage.user.form.bio')}
                  row={5}
                  maxLength={200}
                  showCount
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={(<SaveOutlined />) as React.ReactNode}
                  className="rounded-lg h-12 font-medium text-base hover:opacity-90 transition-opacity"
                >
                  {$t('common.update')}
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    </div>
  )
}

export default UserPage

import { Avatar, Button, Card, Carousel, message, Modal, Input } from 'antd'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import Api from '@/service/api'
import { DiaryDetail, DiaryReviewReq } from '@/service/api/diary/types.ts'
import { DiaryStatus } from '@/constants/app.ts'
import '@/pages/detail/index.module.css.scss'
import { $t } from '@/locales'
import { useNavigate } from 'react-router-dom'

const prefix = import.meta.env.VITE_OSS_BASE_URL
const DiaryPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [btnLoading1, setBtnLoading1] = useState(false)
  const [btnLoading2, setBtnLoading2] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [modalVisible, setModalVisible] = useState(false)
  const [rejectedReason, setRejectedReason] = useState('')
  const diaryStatus = searchParams.get('status') as DiaryStatus
  const [images, setImages] = useState<string[]>([])
  const [avatar, setAvatar] = useState<string>()
  const [author, setAuthor] = useState<string>()
  const [likeCount, setLikeCount] = useState<number>(0)
  const [commentCount, setCommentCount] = useState<number>(0)
  const [viewCount, setViewCount] = useState<number>(0)
  const [favoriteCount, setFavoriteCount] = useState<number>(0)
  const [shareCount, setShareCount] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [updateAt, setUpdateAt] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = (await Api.diaryApi.getDiary(id!)) as DiaryDetail
      console.log(res)
      setImages(res.images.map(image => `${prefix}${image}`))

      setAuthor(res.author.name)
      setAvatar(`${prefix}${res.author.avatar}`)
      setTitle(res.title)
      setContent(res.content)
      setUpdateAt(new Date(res.updatedAt).toLocaleDateString('zh-CN'))
      const tagList = res.tags.map(tag => tag.name as string)
      setTags(tagList)
      const images = res.images.map(image => `${prefix}${image}`)
      setImages(images)

      setLikeCount(res.likeCount)
      setCommentCount(res.commentCount)
      setViewCount(res.viewCount)
      setFavoriteCount(res.favoriteCount)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async (status: string) => {
    if (status === 'Approved') {
      setBtnLoading1(true)
    } else {
      setBtnLoading2(true)
    }
    if (diaryStatus !== DiaryStatus.Pending && status === 'Approved') {
      status = 'Pending'
    }
    try {
      await Api.diaryApi.reviewTweets(id!, {
        status,
        rejectedReason,
      } as DiaryReviewReq)
      message.success($t('system.updateCancel'))
      navigate(`/tweets?status=${status}`)
    } catch (error) {
      message.error($t('system.updateConfirm'))
      console.error('Error fetching data:', error)
    } finally {
      if (status === 'Approved' || status === 'Pending') {
        setBtnLoading1(false)
      } else {
        setBtnLoading2(false)
      }
    }
  }

  const getLeftBtnText = () => {
    switch (diaryStatus) {
      case DiaryStatus.Pending:
        return $t('common.approve')
      case DiaryStatus.Approved:
      case DiaryStatus.Rejected:
        return $t('common.tip')
    }
  }

  const getRightBtnText = () => {
    return $t('common.reject')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="max-w-xl mx-auto bg-white p-4 space-y-4">
      <Card
        loading={loading}
        style={{
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar src={avatar} />
            <span className="font-medium">{author}</span>
          </div>
        </div>

        <div>
          <Carousel arrows infinite={false}>
            {images.map(
              (image, index) =>
                (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                ) as React.ReactNode
            )}
          </Carousel>
          <h2 className="mt-3 font-semibold text-lg">{title}</h2>
          <p className="text-grap-600 text-sm mt-1">{content}</p>
          <div className="text-sm text-blue-500 mt-2 space-x-2">
            {tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">{updateAt}</div>
        </div>

        <div className="flex justify-around text-gray-500 text-sm border-t pt-3">
          <div className="flex items-center gap-1">
            <Icon icon="mdi-light:heart" width="24" height="24" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="material-symbols-light:star-outline" width="24" height="24" />
            <span>{favoriteCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="ant-design:message-outlined" width="24" height="24" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="hugeicons:view" width="24" height="24" />
            <span>{viewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="material-symbols-light:share-outline" width="24" height="24" />
            <span>{shareCount}</span>
          </div>
        </div>
      </Card>
      <div className="flex justify-around align-center mt-3">
        <Button
          type="primary"
          size="large"
          className="custom-btn-gradient custom-btn-approve"
          loading={btnLoading1}
          onClick={() => handleClick(DiaryStatus.Approved)}
        >
          <span
            style={{
              width: '150px',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {getLeftBtnText()}
          </span>
        </Button>
        {diaryStatus !== DiaryStatus.Rejected && (
          <Button
            danger
            size="large"
            className="custom-btn-gradient custom-btn-reject"
            onClick={() => setModalVisible(true)}
          >
            <span
              style={{
                width: '150px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {getRightBtnText()}
            </span>
          </Button>
        )}
      </div>

      <Modal
        title={
          (<span className="text-red-500 font-bold">{$t('system.title')}</span>) as React.ReactNode
        }
        open={modalVisible}
        onOk={() => handleClick(DiaryStatus.Rejected)}
        onCancel={() => {
          setModalVisible(false)
        }}
        okText={$t('common.confirm')}
        cancelText={$t('common.cancel')}
        okButtonProps={{
          danger: true,
          loading: btnLoading2,
          disabled: !rejectedReason,
        }}
        centered
        className="user-delete-modal"
      >
        <div className="py-4">
          <p className="text-lg mb-4">{$t('system.reload')}</p>
          <p className="mb-4">{$t('system.updateContent')}</p>
          <Input.TextArea
            autosize={{ minRows: 1, maxRows: 3 }}
            rows={3}
            placeholder="..."
            value={rejectedReason}
            onChange={e => setRejectedReason(e.target.value)}
            className="w-full"
          />
        </div>
      </Modal>
    </div>
  )
}

export default DiaryPage

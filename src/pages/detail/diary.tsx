import { Avatar, Card, Carousel } from 'antd'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '@/service/api'
import { DiaryDetail } from '@/service/api/Diary/types.ts'

const prefix = import.meta.env.VITE_OSS_BASE_URL
const DiaryPage = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [images, setImages] = useState<string[]>([])
  const [slug, setSlug] = useState<string>()
  const [avatar, setAvatar] = useState<string>()
  const [thumbnail, setThumbnail] = useState<string>()
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
      setSlug(`${prefix}{res.slug}`)
      setThumbnail(`${prefix}${res.thumbnail}`)

      setAuthor(res.author.name)
      setAvatar(`${prefix}${res.author.avatar}`)
      setTitle(res.title)
      setContent(res.content)
      setUpdateAt(new Date(res.updatedAt).toLocaleDateString('zh-CN'))
      const tagList = res.tags.map(tag => tag.name as string)
      setTags(tagList)
      const images = res.images.map(image => `${prefix}${image}`)
      setSlug(`${prefix}${res.slug}`)
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
          minHeight: '500px',
        }}
      >
        <div className="flex items-center justify-between">
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
    </div>
  )
}

export default DiaryPage

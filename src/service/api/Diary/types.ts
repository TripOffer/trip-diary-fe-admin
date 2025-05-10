export interface ReviewListReq {
  query?: string
  status: string
  authorId: number
  sort?: string
  order?: string
  page: number
  size: number
}

export interface AuthorReview {
  id: number
  name: string
}

export interface DiaryReview {
  id: number
  title: string
  status: string
  author: AuthorReview
  published: boolean
  publishedAt: string
  createdAt: string
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
}

export interface ReviewListResData {
  total: number
  page: number
  size: number
  totalPage: number
  list: DiaryReview[]
}

export interface SearchReq {
  query?: string
  sort?: string
  order?: string
  page: number
  size: number
}

export interface AuthorSearch {
  id: number
  name: string
  avatar: string
}

export interface Tag {
  id?: string
  name?: string
}

export interface DiarySearch {
  id: number
  title: string
  author: AuthorSearch
  tags: Tag[]
  slug: string
  thumbnail: string
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
  publishedAt: string
  updatedAt: string
  isLiked: boolean
  isFavorite: boolean
  isFollowedAuthor: boolean
}

export interface SearchResData {
  total: number
  page: number
  size: number
  totalPage: number
  list: DiarySearch[]
}

export interface DiaryDetail {
  author: AuthorSearch
  authorId: number
  commentCount: number
  content: string
  createdAt: string
  favoriteCount: number
  id: string
  images: string[]
  /**
   * Auth
   */
  isFavorited?: boolean
  /**
   * Auth
   */
  isFollowedAuthor?: boolean
  /**
   * Auth
   */
  isLiked?: boolean
  likeCount: number
  publishedAt: string
  reviewedAt: string
  slug: string
  status: string
  tags: Tag[]
  thumbnail: string
  title: string
  updatedAt: string
  video: null
  viewCount: number
  [property: string]: any
}

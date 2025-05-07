export interface UserInfoData {
  userId: number
  username: string
  email: string
  bio: string
  avatar: string
  role: string
  gender: string
  birthday: Date
  createTime: Date
  updateTime: Date
  [property: string]: any
}

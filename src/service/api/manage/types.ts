import { Gender, RoleEnum } from '@/constants/app.ts'

export interface UserListReq {
  email?: string
  /**
   * ID 编号
   */
  id?: number
  name?: string
  page?: number
  role?: RoleEnum
  size?: number
  [property: string]: any
}

export interface UserBasicInfo {
  avatar: null | string
  bio: null | string
  createdAt: string
  gender: Gender
  id: number
  name: string
  [property: string]: any
}

export interface UserListResData {
  list: UserBasicInfo[]
  page: number
  size: number
  total: number
  totalPages: number
  [property: string]: any
}

export interface ChangeRoleReq {
  role: RoleEnum
  [property: string]: any
}

export interface ChangeRoleResData {
  id: string
  name: string
  role: RoleEnum
  [property: string]: any
}

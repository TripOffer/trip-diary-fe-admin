export interface Diary {
  total: number
  today: number
  pending: number
  approved: number
  rejected: number
  viewTotal: number
  likeTotal: number
  favoriteTotal: number
  shareTotal: number
}

export interface Comment {
  total: number
  today: number
  likeTotal: number
  replyTotal: number
}

export interface Tag {
  total: number
  viewTotal: number
}

export interface Audit {
  pending: number
  approved: number
  rejected: number
}

export interface StatsResData {
  diary: Diary
  comment: Comment
  tag: Tag
  audit: Audit
}

export interface SummaryReq {
  type: string
  period?: string
  start: string
  end: string
}

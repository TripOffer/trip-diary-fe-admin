import { transformRecordToOption } from '@/utils/common.ts'
export enum RoleEnum {
  Admin = 'Admin',
  User = 'User',
  Reviewer = 'Reviewer',
  Super = 'Super',
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Secret = 'secret',
}

export enum SummaryStatsType {
  UserRegister = 'user_register',
  UserActive = 'user_active',
  DiaryCreate = 'diary_create',
  DiaryView = 'diary_view',
  DiaryLike = 'diary_like',
  DiaryFavorite = 'diary_favorite',
  DiaryShare = 'diary_share',
  DiaryComment = 'diary_comment',
  DiaryApproved = 'diary_approved',
  DiaryRejected = 'diary_rejected',
  DiaryPending = 'diary_pending',
  CommentCreate = 'comment_create',
  CommentLike = 'comment_like',
  CommentReply = 'comment_reply',
  TagCreate = 'tag_create',
  TagView = 'tag_view',
}

export enum Period {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

export enum DiaryStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum sortBy {
  CreateAt = 'createAt',
  PublishedAt = 'publishedAt',
  ViewCount = 'viewCount',
  LikeCount = 'likeCount',
  FavoriteCount = 'favoriteCount',
  CommentCount = 'commentCount',
}

export enum sortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__'

export const GLOBAL_SIDER_MENU_ID = '__GLOBAL_SIDER_MENU__'

export const loginModuleRecord: Record<UnionKey.LoginModule, App.I18n.I18nKey> = {
  'code-login': 'page.login.codeLogin.title',
  'pwd-login': 'page.login.pwdLogin.title',
  register: 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title',
}

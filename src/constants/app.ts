import { transformRecordToOption } from '@/utils/common.ts'
export enum RoleEnum {
  Admin = 'admin',
  User = 'user',
  Reviewer = 'reviewer',
  Super = 'super',
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

export const GLOBAL_HEADER_MENU_ID = '__GLOBAL_HEADER_MENU__'

export const GLOBAL_SIDER_MENU_ID = '__GLOBAL_SIDER_MENU__'

export const loginModuleRecord: Record<UnionKey.LoginModule, App.I18n.I18nKey> = {
  'code-login': 'page.login.codeLogin.title',
  'pwd-login': 'page.login.pwdLogin.title',
  register: 'page.login.register.title',
  'reset-pwd': 'page.login.resetPwd.title',
}

export const info = `██████╗ ███████╗ █████╗  ██████╗████████╗███████╗ ██████╗ ██╗   ██╗██████╗ ███████╗ █████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔═══██╗╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗████╗  ██║
██████╔╝█████╗  ███████║██║        ██║   ███████╗██║   ██║ ╚████╔╝ ██████╔╝█████╗  ███████║██╔██╗ ██║
██╔══██╗██╔══╝  ██╔══██║██║        ██║   ╚════██║██║   ██║  ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██║██║╚██╗██║
██║  ██║███████╗██║  ██║╚██████╗   ██║   ███████║╚██████╔╝   ██║   ██████╔╝███████╗██║  ██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝ ╚═════╝    ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝`

declare namespace Api {
  namespace Auth {
    interface LoginToken {
      token: string
      refreshToken: string
    }

    interface UserInfo {
      roles: string[]
      userId: string
      username: string
    }

    type Info = {
      token: LoginToken['token']
      userInfo: UserInfo
    }
  }
}

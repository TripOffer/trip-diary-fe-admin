import http from '@/service/request/axios.ts'
import BaseApi from '@/service/api/shared.ts'
import { UserInfoData } from '@/service/api/user/types.ts'

class UserApi extends BaseApi {
  // 获取用户信息
  urls = {
    userInfo: '/user/me',
  }

  tag: string = 'UserApi'

  async getUserInfo() {
    const res = await http.get<UserInfoData>(this.urls.userInfo)
    console.log(res.data)
    return res.data
  }

  async updateUserInfo(data: { birthday: Date; gender: string; bio: string; name: string }) {
    return http.put<UserInfoData>(this.urls.userInfo, data)
  }
}

export default new UserApi()

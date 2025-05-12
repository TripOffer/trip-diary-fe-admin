import BaseApi from '@/service/api/shared.ts'
import {
  ChangeRoleReq,
  ChangeRoleResData,
  UserListReq,
  UserListResData,
} from '@/service/api/manage/types.ts'

class ManageApi extends BaseApi {
  urls = {
    userList: '/user/list',
  }
  tag = 'manage'

  async getUserList(params: UserListReq) {
    const res = await this.http.get<UserListResData>(this.urls.userList, { params })
    return res.data
  }

  async changeRole(id: string, data: ChangeRoleReq) {
    const res = await this.http.put<ChangeRoleResData>(`/user/${id}/role`, data)
  }
}

export default new ManageApi()

import BaseApi from '@/service/api/shared.ts'
import { StatsResData, SummaryReq } from '@/service/api/stats/types.ts'

class StatsApi extends BaseApi {
  urls = {
    reviewer: '/stats/reviewer',
    admin: '/stats/admin',
    summary: '/stats/summary',
  }

  tag: string = 'StatsApi'

  async getReviewerStats() {
    const res = await this.http.get<StatsResData>(this.urls.reviewer)
    return res.data
  }

  async getAdminStats() {
    const res = await this.http.get<StatsResData>(this.urls.admin)
    return res.data
  }

  async getSummaryStats(data: SummaryReq) {
    const res = await this.http.get<StatsResData>(this.urls.summary, { params: data })
    return res.data
  }
}

export default new StatsApi()

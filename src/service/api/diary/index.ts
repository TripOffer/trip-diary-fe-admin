import BaseApi from '@/service/api/shared.ts'
import {
  DiaryDetail,
  DiaryReviewReq,
  ReviewListReq,
  ReviewListResData,
  SearchReq,
  SearchResData,
} from '@/service/api/diary/types.ts'

class DiaryApi extends BaseApi {
  urls = {
    reviewList: '/diary/review-list',
    search: '/diary/search',
  }

  tag = 'Diary'

  async reviewList(params: ReviewListReq) {
    const res = await this.http.get<ReviewListResData>(this.urls.reviewList, { params })
    return res.data
  }

  async search(params: SearchReq) {
    const res = await this.http.get<SearchResData>(this.urls.search, { params })
    return res.data
  }

  async getDiary(id: string) {
    const res = await this.http.get<DiaryDetail>(`/diary/${id}/detail`)
    return res.data
  }

  async reviewTweets(id: string, data: DiaryReviewReq) {
    const res = await this.http.post(`/diary/${id}/review`, data)
    return res.data
  }

  async deleteDiary(id: string) {
    const res = await this.http.delete(`/diary/${id}`)
    return res.data
  }
}

export default new DiaryApi()

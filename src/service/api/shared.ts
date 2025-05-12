import { AxiosInstance } from 'axios'
import http from '../request/axios.ts'
import { camelToSnake, snakeToCamel } from '../request/snakeCaseHelper.ts'

export default abstract class BaseApi {
  protected http: AxiosInstance = http
  abstract urls: { [key: string]: string }
  abstract tag: string
}

export interface ApiRes<T = any> {
  code: number
  data: T
  msg: string
  [property: string]: any
}

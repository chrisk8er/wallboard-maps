import { GeneralApiProblem } from './api-problem'
import { RegencyFeatureCollection } from 'models/map-store/regency'

export interface User {
  id: number
  name: string
}

export interface Wallboard {
  lastQueue: number
  runningText: string
}

export type GetWallboardResult =
  | { kind: 'ok'; wallboard: Wallboard }
  | GeneralApiProblem

export type GetUsersResult = { kind: 'ok'; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: 'ok'; user: User } | GeneralApiProblem

export type GetGeojsonProvinceResult =
  | { kind: 'ok'; geojsonProvince: GeoJSON.FeatureCollection }
  | GeneralApiProblem

export type GetGeojsonRegencyResult =
  | { kind: 'ok'; geojsonRegency: RegencyFeatureCollection }
  | GeneralApiProblem

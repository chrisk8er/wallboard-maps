import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import { getGeneralApiProblem } from './api-problem'
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config'
import * as Types from './api.types'

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce!: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  async getWallboard(): Promise<Types.GetWallboardResult> {
    if (this.apisauce) {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(
        `/kominfo/loket/wallboard`
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      // transform the data into the format we are expecting
      try {
        const resultWallboard: Types.Wallboard = response.data
        return { kind: 'ok', wallboard: resultWallboard }
      } catch {
        return { kind: 'bad-data' }
      }
    }

    return { kind: 'unknown', temporary: true }
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    if (this.apisauce) {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/users`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertUser = (raw: { id: any; name: any }) => {
        return {
          id: raw.id,
          name: raw.name,
        }
      }

      // transform the data into the format we are expecting
      try {
        const rawUsers = response.data
        const resultUsers: Types.User[] = rawUsers.map(convertUser)
        return { kind: 'ok', users: resultUsers }
      } catch {
        return { kind: 'bad-data' }
      }
    }

    return { kind: 'unknown', temporary: true }
  }

  async getProvince(id: number): Promise<Types.GetGeojsonProvinceResult> {
    if (this.apisauce) {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(
        `maps/province?id=${id}`
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: 'ok', geojsonProvince: response.data }
    }

    return { kind: 'unknown', temporary: true }
  }
}

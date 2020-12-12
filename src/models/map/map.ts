import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment } from 'models/extentions/withEnvironment'
import { GetGeojsonProvinceResult } from 'services/api'
import { ReactotronCore, Reactotron } from 'reactotron-core-client'

declare global {
  interface Console {
    tron?: Reactotron<ReactotronCore> & ReactotronCore
  }
}

export const MapModel = types
  .model('Map')
  .props({
    provinceId: types.optional(types.number, 31),
    regencyId: types.optional(types.number, 31),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const setProvinceId = (id: number) => {
      self.provinceId = id
      getGeojsonProvince()
    }

    const setRegencyId = (id: number) => {
      self.regencyId = id
    }

    const saveGeojsonProvince = (result: GeoJSON.FeatureCollection) => {
      console.log(result)
    }

    const getGeojsonProvince = flow(function* () {
      const result: GetGeojsonProvinceResult = yield self.environment.api.getProvince(
        self.provinceId
      )

      if (result.kind === 'ok') {
        saveGeojsonProvince(result.geojsonProvince)
      } else {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.tron?.log && console.tron.log(result.kind)
          console.log(result.kind)
        }
      }
    })

    return {
      setProvinceId,
      setRegencyId,
      saveGeojsonProvince,
      getGeojsonProvince,
    }
  })

type MapType = Instance<typeof MapModel>
export interface MapStore extends MapType {}
type MapSnapshotType = SnapshotOut<typeof MapModel>
export interface MapSnapshot extends MapSnapshotType {}

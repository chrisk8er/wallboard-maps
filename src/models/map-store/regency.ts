import { flow, Instance, types } from 'mobx-state-tree'
import { withEnvironment } from 'models/extentions/withEnvironment'
import { GetGeojsonRegencyResult } from 'services/api'

export interface RegencyFeature extends GeoJSON.Feature {
  properties: RegencyProperties
}

export interface RegencyFeatureCollection
  extends Omit<GeoJSON.FeatureCollection, 'features'> {
  features: RegencyFeature[]
}

const CaseCategoryModel = types.model({
  name: types.string,
  total: types.number,
  kpi: types.number,
})

const RegencyPropertiesModel = types.model({
  id: types.string,
  name: types.string,
  latitude: types.number,
  longitude: types.number,
  total_ticket: types.number,
  open_ticket: types.number,
  closed_ticket: types.number,
  total_call: types.number,
  total_answer: types.number,
  total_abandon: types.number,
  color: types.string,
  category: types.optional(types.array(CaseCategoryModel), []),
})

export const RegencyModel = types
  .model('Regency', {
    // provinceId: types.optional(types.number, 31),
    properties: types.array(RegencyPropertiesModel),
    isLoading: types.optional(types.boolean, false),
    geojsonFeatureCollection: types.optional(
      types.string,
      '{\n  "type": "FeatureCollection",\n  "features": []\n}'
    ),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const getByProvinceId = (id: number) => {
      getGeojson(id)
    }

    const setGeojson = (result: RegencyFeatureCollection) => {
      self.geojsonFeatureCollection = JSON.stringify(result)
      let newProperties: RegencyProperties[] = result.features.map(
        (feature) => feature.properties
      )
      self.properties.replace(newProperties)
    }

    const getGeojson = flow(function* (id: number) {
      self.isLoading = true

      const result: GetGeojsonRegencyResult = yield self.environment.api.getRegency(
        id
      )

      if (result.kind === 'ok') {
        setGeojson(result.geojsonRegency)
      } else {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.tron?.log && console.tron.log(result.kind)
          console.log(result.kind)
        }
      }
      self.isLoading = false
    })

    return {
      getByProvinceId,
      setGeojson,
      getGeojson,
    }
  })
  .views((self) => ({
    getRegencyMap(): RegencyFeatureCollection {
      return JSON.parse(self.geojsonFeatureCollection)
    },
  }))

export type CaseCategoryType = Instance<typeof CaseCategoryModel>
export type RegencyPropertiesType = Instance<typeof RegencyPropertiesModel>
export type RegencyType = Instance<typeof RegencyModel>
export interface CaseCategory extends CaseCategoryType {}
export interface RegencyProperties extends RegencyPropertiesType {}
export interface RegencyStore extends RegencyType {}

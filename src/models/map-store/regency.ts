import { flow, Instance, types } from 'mobx-state-tree'
import { withEnvironment } from 'models/extentions/withEnvironment'
import { GetGeojsonRegencyResult } from 'services/api'

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
  category: types.optional(types.array(CaseCategoryModel), []),
})

export const RegencyModel = types
  .model('Regency', {
    id: types.optional(types.number, 31),
    properties: types.maybeNull(RegencyPropertiesModel),
    featureCollectionIsLoading: types.optional(types.boolean, false),
    geojsonFeatureCollection: types.optional(
      types.string,
      '{\n  "type": "FeatureCollection",\n  "features": []\n}'
    ),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const setId = (id: number) => {
      self.id = id
      getGeojson()
    }

    const setGeojson = (result: GeoJSON.FeatureCollection) => {
      self.geojsonFeatureCollection = JSON.stringify(result)
      if (result.features[0].properties) {
        self.properties = result.features[0].properties as RegencyProperties
      }
    }

    const getGeojson = flow(function* () {
      self.featureCollectionIsLoading = true

      const result: GetGeojsonRegencyResult = yield self.environment.api.getRegency(
        self.id
      )

      if (result.kind === 'ok') {
        setGeojson(result.geojsonRegency)
      } else {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          console.tron?.log && console.tron.log(result.kind)
          console.log(result.kind)
        }
      }
      self.featureCollectionIsLoading = false
    })

    return {
      setId,
      setGeojson,
      getGeojson,
    }
  })
  .views((self) => ({
    getRegencyMap(): GeoJSON.FeatureCollection {
      return JSON.parse(self.geojsonFeatureCollection)
    },
    getCategory(): [CaseCategory] | undefined {
      let category = self.properties?.category
      if (!category) {
        return category
      }

      return undefined
    },
  }))

export type CaseCategoryType = Instance<typeof CaseCategoryModel>
export type RegencyPropertiesType = Instance<typeof RegencyPropertiesModel>
export type RegencyType = Instance<typeof RegencyModel>
export interface CaseCategory extends CaseCategoryType {}
export interface RegencyProperties extends RegencyPropertiesType {}
export interface RegencyStore extends RegencyType {}

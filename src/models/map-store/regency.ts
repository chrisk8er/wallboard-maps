import { flow, Instance, types } from 'mobx-state-tree'
import { withEnvironment } from 'models/extentions/withEnvironment'
import { GetGeojsonRegencyResult } from 'services/api'
import { DetailTicketModel } from './detail-ticket'

const defaultProperties = {
  id: '',
  name: '',
  latitude: 0,
  longitude: 0,
  open_ticket: 0,
  closed_ticket: 0,
  total_call: 0,
  total_answer: 0,
  total_abandon: 0,
  color: '',
  detail_ticket: [],
}

export interface RegencyFeature extends GeoJSON.Feature {
  properties: RegencyProperties
}

export interface RegencyFeatureCollection
  extends Omit<GeoJSON.FeatureCollection, 'features'> {
  features: RegencyFeature[]
}

const RegencyPropertiesModel = types.model({
  id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  latitude: types.maybeNull(types.number),
  longitude: types.maybeNull(types.number),
  total_ticket: types.maybeNull(types.number),
  open_ticket: types.maybeNull(types.number),
  closed_ticket: types.maybeNull(types.number),
  total_call: types.maybeNull(types.number),
  total_answer: types.maybeNull(types.number),
  total_abandon: types.maybeNull(types.number),
  color: types.optional(types.string, ''),
  detail_ticket: types.optional(types.array(DetailTicketModel), []),
})

export const RegencyModel = types
  .model('Regency', {
    // provinceId: types.optional(types.number, 31),
    allProperties: types.array(RegencyPropertiesModel),
    properties: RegencyPropertiesModel,
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
      self.allProperties.replace(newProperties)
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

    const setProperties = (properties: RegencyProperties) => {
      self.properties = properties
    }

    return {
      getByProvinceId,
      setGeojson,
      getGeojson,
      setProperties,
    }
  })
  .views((self) => ({
    getRegencyMap(): RegencyFeatureCollection {
      return JSON.parse(self.geojsonFeatureCollection)
    },
  }))

export type RegencyPropertiesType = Instance<typeof RegencyPropertiesModel>
export type RegencyType = Instance<typeof RegencyModel>
export interface RegencyProperties extends RegencyPropertiesType {}
export interface RegencyStore extends RegencyType {}

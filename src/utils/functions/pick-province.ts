import { LatLngExpression } from 'leaflet'

export interface FeatureObject {
  type: string
  properties: {
    id: number
    latitude: number
    longitude: number
    name: string
  }
  geometry: {
    type: string
    coordinates:
      | LatLngExpression[]
      | LatLngExpression[][]
      | LatLngExpression[][][]
  }
}

export function pickProvince(features: FeatureObject[], selectedId: number) {
  let pickedFeature: FeatureObject | null = null

  features.forEach((feature: FeatureObject) => {
    if (feature.properties.id === selectedId) pickedFeature = feature
  })

  return pickedFeature
}

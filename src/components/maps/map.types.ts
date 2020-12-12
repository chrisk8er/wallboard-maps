import { LatLngExpression } from 'leaflet'

export interface Geometry {
  type: string
  coordinates:
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][]
}

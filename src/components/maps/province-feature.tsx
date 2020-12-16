import React, { useEffect, useRef } from 'react'
import { GeoJSON as LeafletGeoJSON, LatLngBoundsExpression } from 'leaflet'
import { GeoJSON, useMap } from 'react-leaflet'

export interface ProvinceFeatureProps {
  data: GeoJSON.Feature
}

export function ProvinceFeature({ data }: ProvinceFeatureProps) {
  const geojsonRef = useRef<LeafletGeoJSON>(null)
  const map = useMap()

  useEffect(() => {
    if (geojsonRef.current) {
      // update shape
      geojsonRef.current?.clearLayers()
      geojsonRef.current?.addData(data)

      // focus on shape
      const featureBounds: LatLngBoundsExpression = geojsonRef.current?.getBounds() as LatLngBoundsExpression

      setTimeout(() => {
        map.fitBounds(featureBounds)
      }, 500) // waiting new data to added
    }
  }, [data, map])

  return (
    <GeoJSON ref={geojsonRef} data={data} pathOptions={{ color: '#969696a1' }}>
      {/* <Marker
          position={
            [
              data.properties?.longitude.replace(/,/g, '.'),
              data.properties?.latitude.replace(/,/g, '.'),
            ] as LatLngExpression
          }
        /> */}
    </GeoJSON>
  )
}

export default ProvinceFeature

import React, { useEffect, useRef } from 'react'
import { GeoJSON as LeafletGeoJSON, LatLngBoundsExpression } from 'leaflet'
import { FeatureGroup, GeoJSON, useMap } from 'react-leaflet'

export interface ProvinceFeatureProps {
  data: GeoJSON.Feature
}

export function ProvinceFeature({ data }: ProvinceFeatureProps) {
  const geojsonRef = useRef<LeafletGeoJSON>(null)
  const map = useMap()

  useEffect(() => {
    if (geojsonRef.current) {
      // update shape
      // geojsonRef.current?.clearLayers()
      // geojsonRef.current?.addData(data)

      // focus on shape
      const featureBounds: LatLngBoundsExpression = geojsonRef.current.getBounds() as LatLngBoundsExpression

      setTimeout(() => {
        if (featureBounds) map.fitBounds(featureBounds)
      }, 1000) // waiting new data to added
    }
    return () => {
      clearTimeout()
    }
  }, [data, map])

  return (
    <FeatureGroup pathOptions={{ color: '#969696a1' }}>
      <GeoJSON ref={geojsonRef} data={data} pathOptions={{ color: 'yellow' }}>
        {/* <Marker
          position={
            [
              data.properties?.longitude.replace(/,/g, '.'),
              data.properties?.latitude.replace(/,/g, '.'),
            ] as LatLngExpression
          }
        /> */}
      </GeoJSON>
    </FeatureGroup>
  )
}

export default ProvinceFeature

import React, { useEffect, useRef } from 'react'
import { GeoJSON as LeafletGeoJSON, LatLngBoundsExpression } from 'leaflet'
import { FeatureGroup, GeoJSON, useMap } from 'react-leaflet'

export interface ProvinceFeatureProps {
  data: GeoJSON.Feature
}

export function ProvinceFeature({ data }: ProvinceFeatureProps) {
  const featureRef = useRef<LeafletGeoJSON>(null)
  const map = useMap()

  useEffect(() => {
    // focus on the shape
    const featureBounds: LatLngBoundsExpression = featureRef.current?.getBounds() as LatLngBoundsExpression
    map.fitBounds(featureBounds)
  }, [map])

  return (
    <FeatureGroup pathOptions={{ color: '#969696a1' }}>
      <GeoJSON ref={featureRef} data={data}>
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

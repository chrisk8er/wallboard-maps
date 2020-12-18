import React, { useEffect, useRef } from 'react'
import { GeoJSON as LeafletGeoJSON, LatLngBoundsExpression } from 'leaflet'
import { FeatureGroup, GeoJSON, Tooltip, useMap } from 'react-leaflet'

export interface RegencyFeatureProps {
  data: GeoJSON.FeatureCollection
}

export function RegencyFeature({ data }: RegencyFeatureProps) {
  const geojsonRef = useRef<LeafletGeoJSON>(null)
  const map = useMap()

  useEffect(() => {
    if (geojsonRef.current) {
      // update shape
      geojsonRef.current?.clearLayers()
      geojsonRef.current?.addData(data)

      // focus on shape
      const featureBounds: LatLngBoundsExpression = geojsonRef.current?.getBounds() as LatLngBoundsExpression

      // setTimeout(() => {
      //   map.fitBounds(featureBounds)
      // }, 1000) // waiting new data to added
    }
  }, [data, map])
  return (
    <FeatureGroup>
      {data.features.map((feature, index) => (
        <GeoJSON
          key={index}
          pathOptions={{
            color: 'grey',
            fillColor: feature.properties?.color,
            fillOpacity: 0.7,
            opacity: 1,
            weight: 2,
            dashArray: '3',
          }}
          data={feature}
        >
          <Tooltip direction="right" sticky>
            {feature.properties?.name}
          </Tooltip>
        </GeoJSON>
      ))}
    </FeatureGroup>
  )
}

export default RegencyFeature

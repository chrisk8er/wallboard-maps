import React from 'react'
import { FeatureGroup, GeoJSON, Tooltip } from 'react-leaflet'

export interface RegencyFeatureProps {
  data: GeoJSON.FeatureCollection
}

export function RegencyFeature({ data }: RegencyFeatureProps) {
  return (
    <FeatureGroup>
      {data.features.map((feature, index) => (
        <GeoJSON key={index} pathOptions={{ color: 'yellow' }} data={feature}>
          <Tooltip direction="right" sticky>
            {feature.properties?.name}
          </Tooltip>
        </GeoJSON>
      ))}
    </FeatureGroup>
  )
}

export default RegencyFeature

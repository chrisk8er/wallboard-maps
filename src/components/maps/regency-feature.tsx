import React from 'react'
import { cloneDeep } from 'lodash'
import { FeatureGroup, GeoJSON, Tooltip, useMap } from 'react-leaflet'
import { RegencyFeatureCollection } from 'models/map-store/regency'
import { GeoJSON as LeafletGeoJSON } from 'leaflet'

export interface RegencyFeatureProps {
  data: RegencyFeatureCollection
  onFeatureClick?: Function
}

export function RegencyFeature({ data, onFeatureClick }: RegencyFeatureProps) {
  const map = useMap()

  let previousFeature: LeafletGeoJSON
  let previousColor: string
  const { features } = data

  const onclick = (e: any) => {
    const layer = e.target

    if (onFeatureClick) onFeatureClick(e.layer)

    // reset previous style
    if (previousFeature !== undefined) {
      previousFeature.setStyle({
        fillColor: previousColor,
      })
    }

    // set Color
    layer.setStyle({ fillColor: '#3f51b5' })

    // set previous step
    previousFeature = layer
    previousColor = layer.options.pathOptions.fillColor

    // set focus
    map.fitBounds(layer.getBounds())
  }

  return (
    <FeatureGroup>
      {features &&
        features.map((feature, index) => {
          return (
            <GeoJSON
              key={index}
              pathOptions={{
                color: 'grey',
                fillColor: feature.properties.color,
                fillOpacity: 0.5,
                opacity: 1,
                weight: 2,
                dashArray: '3',
              }}
              data={feature}
              eventHandlers={{
                click: onclick,
              }}
            >
              <Tooltip direction="right" sticky>
                {feature.properties?.name}
              </Tooltip>
            </GeoJSON>
          )
        })}
    </FeatureGroup>
  )
}

export default RegencyFeature

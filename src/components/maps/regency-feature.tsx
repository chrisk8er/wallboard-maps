import React, { useEffect, useRef, useState } from 'react'
import { Feature } from 'geojson'
import { FeatureGroup, GeoJSON, Tooltip, useMap } from 'react-leaflet'
import {
  GeoJSON as LeafletGeoJSON,
  LatLngBoundsExpression,
  Layer,
  LeafletMouseEvent,
} from 'leaflet'

export interface RegencyFeatureProps {
  data: GeoJSON.FeatureCollection
}

export function RegencyFeature({ data }: RegencyFeatureProps) {
  const geojsonRef = useRef<LeafletGeoJSON>(null)
  const map = useMap()

  useEffect(() => {
    if (geojsonRef.current) {
      // update shape
      // geojsonRef.current?.clearLayers()
      // geojsonRef.current?.addData(data)
      // focus on shape
      // const featureBounds: LatLngBoundsExpression = geojsonRef.current?.getBounds() as LatLngBoundsExpression
      // setTimeout(() => {
      //   map.fitBounds(featureBounds)
      // }, 1000) // waiting new data to added
    }
  }, [data])

  const onEachFeature = (feature: Feature, layer: Layer) => {
    layer.on({
      click: (e: LeafletMouseEvent) => {
        // e.target.
        // focus on clicked feature
        map.fitBounds(e.target.getBounds())
      },
    })
  }

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
          onEachFeature={onEachFeature}
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

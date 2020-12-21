import React, { useRef, useState, useEffect } from 'react'
import { cloneDeep } from 'lodash'
import { FeatureGroup, GeoJSON, Tooltip, useMap } from 'react-leaflet'
import { GeoJSON as LeafletGeoJSON } from 'leaflet'
import {
  RegencyFeatureCollection,
  RegencyFeature as RegencyFeatureType,
} from 'models/map-store/regency'

export interface RegencyFeatureProps {
  data: RegencyFeatureCollection
}

export function RegencyFeature({ data }: RegencyFeatureProps) {
  const map = useMap()
  const geojsonRef = useRef<LeafletGeoJSON>(null)
  const [defaultFeatures] = useState(
    cloneDeep<RegencyFeatureType[]>(data.features)
  ) // cloneDeep is better than Object asign or spread operator

  const [features, setFeatures] = useState<RegencyFeatureType[]>(data.features)

  useEffect(() => {
    console.log(geojsonRef?.current?.getLayers())
  }, [geojsonRef])

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
                fillOpacity: 0.7,
                opacity: 1,
                weight: 2,
                dashArray: '3',
              }}
              ref={geojsonRef}
              data={feature}
              eventHandlers={{
                click: (e) => {
                  console.log(e.layer)

                  let newFeatures: RegencyFeatureType[] = features.map(
                    (feature) => {
                      if (
                        feature.properties?.id === e.layer.feature.properties.id
                      ) {
                        feature.properties.color = 'blue'
                        return feature
                      }
                      defaultFeatures.forEach((defaultFeature) => {
                        if (
                          defaultFeature.properties.id === feature.properties.id
                        ) {
                          feature.properties.color =
                            defaultFeature.properties.color
                        }
                      })

                      return feature
                    }
                  )

                  setFeatures(newFeatures)
                  map.fitBounds(e.layer.getBounds())
                },
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

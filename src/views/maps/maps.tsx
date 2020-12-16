import React from 'react'
import { inject, observer } from 'mobx-react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { RouteComponentProps } from '@reach/router'
import { MapStore } from 'models/map'

import Box from '@material-ui/core/Box'

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'

// Components
import Sidebar from 'components/sidebar'
import { StaticHeader } from 'components/header'
import { ProvinceFeature, RegencyFeature } from 'components/maps'

const drawerWidth = 240
const MapsStyles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      height: '100%',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    mapContainer: {
      position: 'relative',
    },
    mapContainerShift: {
      position: 'absolute',
    },
  })

export interface MapsProps
  extends WithStyles<typeof MapsStyles>,
    RouteComponentProps {
  provinceId?: string
  mapStore?: MapStore
}

export interface MapsState {
  center: LatLngExpression
  expandSidebar: boolean
  selectedProvince: number
}

@inject('mapStore')
@observer
class Maps extends React.Component<MapsProps, MapsState> {
  constructor(props: MapsProps) {
    super(props)
    this.state = {
      center: [-0.789275, 113.921327],
      expandSidebar: false,
      selectedProvince: 36,
    }
  }
  componentDidMount() {
    // fetching by province id
    const { provinceId, mapStore } = this.props
    if (provinceId && mapStore) mapStore.setProvinceId(parseInt(provinceId))
  }

  render() {
    const { mapStore } = this.props
    const { expandSidebar } = this.state

    const provinceFeature = mapStore?.getProvinceMap().features[0]

    return (
      <>
        <StaticHeader />
        <Box display="flex" height="100%">
          <Sidebar expand={expandSidebar} />
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            attributionControl={false}
            center={this.state.center}
            zoom={6}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="bottomright" />

            {provinceFeature && <ProvinceFeature data={provinceFeature} />}
            {/* <RegencyFeature data={batenRegFeature} /> */}
          </MapContainer>
        </Box>
      </>
    )
  }
}

export const MapsView = withStyles(MapsStyles)(Maps)

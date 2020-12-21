import React from 'react'
import { inject, observer } from 'mobx-react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { RouteComponentProps } from '@reach/router'
import { MapStore } from 'models/map-store'

import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'

// Components
import Sidebar from 'components/sidebar'
import Alert from 'components/alert'
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
  openSnackbar: boolean
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
      openSnackbar: false,
    }
  }
  componentDidMount() {
    // fetching by province id
    const { provinceId, mapStore } = this.props

    // promp if province id is empty
    if (!provinceId) this.setState({ openSnackbar: true })

    // Get Province & Regency
    if (provinceId && mapStore) {
      mapStore.province.setId(parseInt(provinceId))
      mapStore.regency.getByProvinceId(parseInt(provinceId))
    }
  }

  handleRegencyClick = (layer: any) => {
    const { mapStore } = this.props

    // this.setState({ expandSidebar: true })

    if (mapStore?.regency) {
      mapStore.setSelectedRegion('regency')
      mapStore.regency.setProperties(layer.feature.properties)
      console.log(layer)
    }
  }

  render() {
    const { mapStore } = this.props
    const { expandSidebar } = this.state

    // const provinceFeature = mapStore?.getProvinceMap().features[0]

    const handleClose = (
      event: React.SyntheticEvent | React.MouseEvent,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return
      }

      this.setState({ openSnackbar: false })
    }

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

            {mapStore?.province && (
              <ProvinceFeature
                data={mapStore.province.getProvinceMap().features[0]}
              />
            )}

            {mapStore?.regency && (
              <RegencyFeature
                data={mapStore.regency.getRegencyMap()}
                onFeatureClick={this.handleRegencyClick}
              />
            )}
          </MapContainer>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning">
            Province could not be found!
          </Alert>
        </Snackbar>
      </>
    )
  }
}

export const MapsView = withStyles(MapsStyles)(Maps)

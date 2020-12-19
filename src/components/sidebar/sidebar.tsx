import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { ProvinceProperties, MapStore } from 'models/map-store'

// Material UI
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// Components
import TicketStatus from 'components/ticket-status'
import TicketActive from 'components/ticket-activity'
import ProvinceCardStatus from 'components/province-status'
import { getSnapshot } from 'mobx-state-tree'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      sidebar: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        height: `calc(100% - ${theme.spacing(2)}px)`,
        zIndex: theme.zIndex.appBar,
      },
      sidebarExpand: {
        position: 'relative',
      },
    }),
  { name: 'sidebar' }
)

interface SidebarProps {
  expand: boolean
  mapStore?: MapStore
}

function Sidebar({ expand, mapStore }: SidebarProps) {
  const classes = useStyles()
  // const [category, setCategory] = useState(mapStore?.province.getCategory())
  // const [
  //   provinceProperties,
  //   setProvinceProperties,
  // ] = useState<ProvinceProperties>()
  // const [expand, setExpand] = useState(true)

  // useEffect(() => {
  //   if (mapStore !== undefined) {
  //     if (
  //       mapStore.province.properties &&
  //       mapStore.province.featureCollectionIsLoading
  //     )
  //       setProvinceProperties(mapStore.province.properties)
  //   }

  //   console.log('loading ' + mapStore?.province.featureCollectionIsLoading)

  //   return () => {
  //     // cleanup
  //   }
  // }, [])

  // return null if map store or province properties doesn't exist
  if (mapStore) console.log('mapstore', getSnapshot(mapStore))

  if (!mapStore || !mapStore.province) return null

  const { province } = mapStore

  return (
    <Box
      className={expand ? classes.sidebarExpand : classes.sidebar}
      p={!expand ? 0 : 2}
      display="flex"
      flexDirection="column"
    >
      <Box pb={2}>
        {province.properties && (
          <ProvinceCardStatus properties={province.properties} />
        )}
      </Box>
      {province.properties && (
        <Box pb={2} flexGrow={1}>
          <TicketActive properties={province.properties} />
        </Box>
      )}
    </Box>
  )
}

export default inject('mapStore')(observer(Sidebar))

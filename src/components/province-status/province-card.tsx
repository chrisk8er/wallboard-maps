import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { red } from '@material-ui/core/colors'
import { observer, inject } from 'mobx-react'
import { MapStore } from 'models/map/map'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

interface ProvinceCardStatusProps {
  mapStore?: MapStore
}

type Properties = {
  id: string
  name: string
  latitude: number
  longitude: number
  total_ticket: number
  open_ticket: number
  closed_ticket: number
  total_call: number
  total_answer: number
  total_abandon: number
}

export function ProvinceCardStatus({ mapStore }: ProvinceCardStatusProps) {
  const classes = useStyles()
  const properties: Properties = mapStore?.getProvinceMap().features[0]
    .properties as Properties

  return (
    <Card className={classes.root} elevation={2}>
      <CardContent>
        <Typography variant="subtitle1">Cases in {properties.name}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Box textAlign="center">
            <Typography variant="h3">{properties.total_ticket}</Typography>
            <Typography variant="subtitle1">Tickets</Typography>
          </Box>
          <Box ml={3} width="150px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="start"
            >
              <Typography variant="subtitle1">Open:</Typography>
              <Typography variant="h5">{properties.open_ticket}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="start"
              mt={1}
            >
              <Typography variant="subtitle1">Closed:</Typography>
              <Typography variant="h5">{properties.closed_ticket}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default inject('mapStore')(observer(ProvinceCardStatus))

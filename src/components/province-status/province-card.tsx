import React from 'react'
import { observer, inject } from 'mobx-react'
import { MapStore, ProvinceProperties } from 'models/map-store'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { red } from '@material-ui/core/colors'

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
  properties: ProvinceProperties
}

export function ProvinceCardStatus({ properties }: ProvinceCardStatusProps) {
  const classes = useStyles()

  if (!properties)
    return (
      <Card className={classes.root} elevation={2}>
        <CardContent>
          <Typography variant="subtitle1"></Typography>
        </CardContent>
      </Card>
    )

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

export default ProvinceCardStatus

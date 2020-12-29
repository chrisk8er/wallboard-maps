import React from 'react'
import { ProvinceProperties } from 'models/map-store'
import { RegencyProperties } from 'models/map-store'
import { DetailTicket } from 'models/map-store/detail-ticket'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
    // height: '100%',
  },
}))

interface ActivityProgressProps extends DetailTicket {}

export function ActivityProgress({ name, total, kpi }: ActivityProgressProps) {
  return (
    <>
      <Box>
        <Typography variant="subtitle2">{name}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={kpi} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            kpi
          )}%`}</Typography>
        </Box>
      </Box>
    </>
  )
}

interface TicketActivityProps {
  title: string
  properties: ProvinceProperties | RegencyProperties
}

function TicketActivity({ title, properties }: TicketActivityProps) {
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        {properties &&
          properties.detail_ticket.map((cat, index) => (
            <ActivityProgress key={index} {...cat} />
          ))}
      </CardContent>
    </Card>
  )
}

export default observer(TicketActivity)

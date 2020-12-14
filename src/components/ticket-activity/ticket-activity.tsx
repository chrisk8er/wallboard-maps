import React from 'react'

// Material UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
  },
}))

export function LinearProgressWithLabel(props: { value: number }) {
  return (
    <>
      <Box>
        <Typography variant="subtitle2">Title</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default function TicketActivity() {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      )
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        title="Ticket by Category"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
        <LinearProgressWithLabel value={progress} />
      </CardContent>
    </Card>
  )
}

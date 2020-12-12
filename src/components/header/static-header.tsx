import React, { useState } from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// make styles
const headerHeight = 64
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      header: {
        height: headerHeight,
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: theme.zIndex.appBar,
      },
    }),
  { name: 'header' }
)

export function StaticHeader() {
  const classes = useStyles()
  const [fullscreen, setFullscreen] = useState(false)
  const [clock, setclock] = useState(moment().format('HH:mm:ss'))

  setInterval(() => {
    setclock(moment().format('HH:mm:ss'))
  }, 1000)

  const handleFullscreenMode = () => {
    // Get the documentElement (<html>) to display the page in fullscreen
    const elem = document.documentElement
    if (fullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen()
      }
      setFullscreen(false)
    }
    if (!fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen()
      }
      setFullscreen(true)
    }
  }

  return (
    <div className={classes.header}>
      <Paper elevation={0}>
        <Box display="flex" alignItems="center" p={1}>
          <IconButton
            onClick={handleFullscreenMode}
            color="inherit"
            aria-label="Change Fullscreen Mode"
          >
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <Box
            display="flex"
            ml={1}
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography variant="h6">{clock}</Typography>
            <Box>
              <Typography variant="subtitle2">
                {moment().format('dddd, MMM Do YYYY')}
              </Typography>
            </Box>
          </Box>
          <Box ml={3} mr={1}>
            <Typography variant="h5">SAKTI 112</Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  )
}

export default StaticHeader

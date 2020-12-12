import React, { useState } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

// Material UI
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
// import LanguageIcon from '@material-ui/icons/Language'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const headerHeight = 64
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      header: {
        height: headerHeight,
        width: '100vw',
      },
      title: {
        flexGrow: 1,
      },
    }),
  { name: 'header' }
)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Element {
    mozRequestFullScreen?: () => Element
    webkitRequestFullscreen?: () => Element
    msRequestFullscreen?: () => Element
  }
  interface Document {
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
  }
}

export default function Header() {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const [fullscreen, setFullscreen] = useState(false)
  const [clock, setclock] = useState(moment().format('HH:mm:ss'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)

  setInterval(() => {
    setclock(moment().format('HH:mm:ss'))
  }, 1000)

  // const handleOpenLanguage = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleChangeLanguage = (lang: null | string) => {
    if (lang) i18n.changeLanguage(lang)
    setAnchorEl(null)
  }

  const handleChangeMode = () => {}

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

  // const handleOpenSetting = () => {
  //   dispatchSetting({
  //     type: TOGGLE_SETTING_PANEL,
  //     setting: { showPanel: !configs.showPanel },
  //   })
  // }

  return (
    <header className={classes.header}>
      <Toolbar>
        <Box display="flex" alignItems="center" className={classes.title}>
          <Typography variant="h5">Jasboard V2</Typography>
          <Box
            display={{ xs: 'none', sm: 'none', md: 'flex' }}
            ml={5}
            alignItems="center"
          >
            <Typography variant="h6">{clock}</Typography>
            <Box marginLeft={3}>
              <Typography variant="subtitle2">
                {moment().format('dddd, MMM Do YYYY')}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <IconButton
          onClick={handleOpenLanguage}
          color="inherit"
          aria-label="Change Mode"
        >
          <LanguageIcon />
        </IconButton> */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleChangeLanguage(null)}
        >
          <MenuItem onClick={() => handleChangeLanguage('en')}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleChangeLanguage('id')}>
            Indonesia
          </MenuItem>
        </Menu>
        <IconButton
          onClick={handleFullscreenMode}
          color="inherit"
          aria-label="Change Fullscreen Mode"
        >
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton
          onClick={handleChangeMode}
          color="inherit"
          aria-label="Change Mode"
        >
          {'dark' === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </header>
  )
}

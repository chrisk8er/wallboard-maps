import React, { useState } from 'react'

// Material UI
import Box from '@material-ui/core/Box'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// Components
import TicketStatus from 'components/ticket-status'
import TicketActive from 'components/ticket-activity'

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
}

export default function Sidebar({ expand }: SidebarProps) {
  const classes = useStyles()
  // const [expand, setExpand] = useState(true)

  return (
    <Box
      className={expand ? classes.sidebarExpand : classes.sidebar}
      p={!expand ? 0 : 2}
      display="flex"
      flexDirection="column"
    >
      <Box pb={2}>
        <TicketStatus />
      </Box>
      <Box pb={2}>
        <TicketStatus />
      </Box>
      <Box pb={2} flexGrow={1}>
        <TicketActive />
      </Box>
    </Box>
  )
}

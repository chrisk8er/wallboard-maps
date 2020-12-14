import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100vh',
      },
      container: {
        height: '100vh',
        padding: 0,
      },
      content: {
        flexGrow: 1,
        height: '100%',
        // padding: theme.spacing(3),
      },
    }),
  { name: 'wallboard' }
)

// interface WallboardMapsProps {}

export default function Wallboard<WallboardMapsProps>(
  props: React.PropsWithChildren<WallboardMapsProps>
) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <main className={classes.content}>{props.children}</main>
      </Container>
    </div>
  )
}

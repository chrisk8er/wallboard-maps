import React from 'react'
import Header from 'components/header'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100vh',
      },
      container: {
        height: `calc(100% - 64px)`,
      },
      content: {
        flexGrow: 1,
        height: '100%',
        // padding: theme.spacing(3),
      },
    }),
  { name: 'wallboard' }
)

interface WallboardProps {}

export default function Wallboard<WallboardProps>(
  props: React.PropsWithChildren<WallboardProps>
) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth={false} className={classes.container}>
        <main className={classes.content}>{props.children}</main>
      </Container>
    </div>
  )
}

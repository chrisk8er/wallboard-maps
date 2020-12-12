import React from 'react'
import {
  createMuiTheme,
  ThemeProvider as MuThemeProvider,
} from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { Setting } from 'models/setting'

interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[]
  settingStore?: Setting
}

function ThemeProvider({ children, settingStore }: ThemeProviderProps) {
  const theme = createMuiTheme({
    palette: {
      type: settingStore?.theme,
    },
  })

  return <MuThemeProvider theme={theme}>{children}</MuThemeProvider>
}

export default inject('settingStore')(observer(ThemeProvider))

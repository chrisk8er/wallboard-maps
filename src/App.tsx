import React, { Component } from 'react'
import AppRouter from 'router'
import { RootStore, setupRootStore } from 'models/root-store'
import { Provider } from 'mobx-react'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from 'components/custom-theme-provider'

interface AppState {
  rootStore?: RootStore
}

export default class App extends Component<{}, AppState> {
  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  async componentDidMount() {
    this.setState(
      {
        rootStore: await setupRootStore(),
      },
      () => {
        console.log('Initilize store')
      }
    )
  }

  render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
      return null
    }

    // otherwise, we're ready to render the app

    // wire stores defined in root-store.ts file
    // const {settingStore, mapStore} = rootStore

    return (
      <>
        <Provider {...rootStore}>
          <ThemeProvider>
            <CssBaseline />
            <AppRouter />
          </ThemeProvider>
        </Provider>
      </>
    )
  }
}

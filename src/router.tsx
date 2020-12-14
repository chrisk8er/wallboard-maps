import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
// import Wallboard from 'layouts/Wallboard'
import WallboardMaps from 'layouts/Maps'
// import { MainView } from 'views/main'
import { MapsView } from 'views/maps'
import { inject, observer } from 'mobx-react'

let Home = (props: RouteComponentProps) => <div>Wallboard Version 2.0</div>

// function RouterComponent({
//   children,
// }: React.PropsWithChildren<RouteComponentProps>) {
//   return <>{children}</>
// }

function AppRouter() {
  return (
    <Router basepath="/">
      <Home path="/" />
      {/* <Wallboard path="/wallboard">
        <MainView path="main" />
      </Wallboard> */}
      <WallboardMaps path="/wallboard-full">
        <MapsView path="maps" />
        <MapsView path="maps/:provinceId" />
      </WallboardMaps>
    </Router>
  )
}

export default inject('mapStore')(observer(AppRouter))

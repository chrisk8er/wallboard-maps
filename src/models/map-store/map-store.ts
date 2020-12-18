import { Instance, SnapshotOut, types } from 'mobx-state-tree'
// import { ReactotronCore, Reactotron } from 'reactotron-core-client'
import { ProvinceModel } from './province'
import { RegencyModel } from './regency'

// declare global {
//   interface Console {
//     tron?: Reactotron<ReactotronCore> & ReactotronCore
//   }
// }

export const MapModel = types.model('Map').props({
  province: types.optional(ProvinceModel, {}),
  regency: types.optional(RegencyModel, {}),
})

type MapType = Instance<typeof MapModel>
export interface MapStore extends MapType {}
type MapSnapshotType = SnapshotOut<typeof MapModel>
export interface MapSnapshot extends MapSnapshotType {}

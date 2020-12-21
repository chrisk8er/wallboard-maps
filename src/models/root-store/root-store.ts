import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { SettingModel } from '../setting'
import { MapModel } from '../map-store'

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  settingStore: types.optional(SettingModel, {}),
  mapStore: types.optional(MapModel, { selectedRegion: 'province' }),
})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshotOut = SnapshotOut<typeof RootStoreModel>

import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const SettingModel = types.model('SettingStore').props({
  name: types.maybeNull(types.string),
  value: types.maybeNull(types.boolean),
  theme: types.optional(
    types.union(
      types.literal('dark'),
      types.literal('light'),
      types.literal(undefined)
    ),
    'dark'
  ),
})

type SettingType = Instance<typeof SettingModel>
export interface Setting extends SettingType {}
type SettingSnapshotType = SnapshotOut<typeof SettingModel>
export interface SettingSnapshot extends SettingSnapshotType {}

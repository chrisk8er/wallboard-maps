import { Instance, types } from 'mobx-state-tree'

export const DetailTicketModel = types.model({
  name: types.string,
  total: types.number,
  kpi: types.number,
})

type DetailTicketType = Instance<typeof DetailTicketModel>
export interface DetailTicket extends DetailTicketType {}

import type { Cell } from '@/party/domain/Cell'

export enum ActionEvent {
  ADD,
  REMOVE
}

export class EventParty {
  id: string
  action: ActionEvent
  cell: Cell

  constructor(id: string, action: ActionEvent, cell: Cell) {
    this.id = id
    this.action = action
    this.cell = cell
  }
}
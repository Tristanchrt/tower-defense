import type { Cell } from '@/party/domain/Cell'

export enum ActionEvent {
  ADD,
  REMOVE
}

export class EventParty {
  action: ActionEvent
  cell: Cell

  constructor(action: ActionEvent, cell: Cell) {
    this.action = action
    this.cell = cell
  }
}

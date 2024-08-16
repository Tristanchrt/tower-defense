import type { Cell } from '@/party/domain/Cell'

export enum ActionEvent {
  ADD
}

export class EventParty {
  action: ActionEvent
  cell: Cell
  round: number

  constructor(action: ActionEvent, cell: Cell, round: number) {
    this.action = action
    this.cell = cell
    this.round = round
  }
}

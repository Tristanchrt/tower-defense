import type { Cell } from '@/party/domain/Cell'

export class EventParty {
  action: string
  cell: Cell
  round: number

  constructor(action: string, cell: Cell, round: number) {
    this.action = action
    this.cell = JSON.parse(JSON.stringify(cell))
    this.round = round
  }
}

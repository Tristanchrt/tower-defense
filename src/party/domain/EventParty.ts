import type { Monster } from '@/party/domain/Monster'
import type { Tower } from '@/party/domain/Tower'

export class EventParty {
  action: string
  cell: Monster | Tower
  round: number

  constructor(action: string, cell: Monster | Tower, round: number) {
    this.action = action
    this.cell = Object.assign(Object.create(Object.getPrototypeOf(cell)), cell)
    this.round = round
  }
}

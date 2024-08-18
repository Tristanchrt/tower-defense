import type { EventParty } from '@/party/domain/EventParty'
import { Monster } from '@/party/domain/Monster'
import { Tower } from '@/party/domain/Tower'
import type { Board } from '@/party/domain/Board'

export class BoardDisplay {
  constructor(private board: Board) {}

  async update(event: EventParty): Promise<void> {
    const { cell } = event

    if (cell instanceof Monster || cell instanceof Tower) {
      this.board.display([cell])
    }
  }
}

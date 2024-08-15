import type { Board } from '@/party/domain/Board'
import type { Player } from '@/party/domain/Player'
import { PartyCreated } from '@/party/domain/PartyCreated'

export class PartyToCreate {
  private readonly id: string
  private readonly board: Board
  private readonly players: Player[]

  constructor(id: string, board: Board, players: Player[]) {
    this.id = id
    this.board = board
    this.players = players
  }

  create() {
    return new PartyCreated(this.id, this.board, this.players)
  }
}

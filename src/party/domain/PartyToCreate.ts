import type { Board } from '@/party/domain/Board'
import type { Player } from '@/party/domain/Player'
import { PartyCreated } from '@/party/domain/PartyCreated'

export class PartyToCreate {
  private readonly board: Board
  private readonly players: Player[]

  constructor(board: Board, players: Player[]) {
    this.board = board
    this.players = players
  }

  public create() {
    return new PartyCreated(this.board, this.players)
  }
}
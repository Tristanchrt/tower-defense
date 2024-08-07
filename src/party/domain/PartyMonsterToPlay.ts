import type { Board } from './Board'
import type { Party } from './Party'
import { PartyPlayersToPlay } from './PartyPlayersToPlay'
import type { Player } from './Player'

export class PartyMonstersToPlay implements Party {
  id: string
  constructor(
    id: string,
    private board: Board,
    private players: Player[],
    private round: number
  ) {
    this.id = id
    this.board = board
    this.players = players
  }

  public getBoard(): Board {
    return this.board
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public toPlayersToPlay() {
    return new PartyPlayersToPlay(this.id, this.board, this.players, this.round)
  }
}

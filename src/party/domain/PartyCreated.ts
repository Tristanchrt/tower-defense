import { Board } from "./Board"
import type { Party } from "./Party"
import { PartyPlayersToPlay } from "./PartyPlayersToPlay"
import { Player } from "./Player"

export class PartyCreated implements Party {
  id: string
  constructor(id: string, private readonly board: Board, private readonly players: Player[]) {
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

  public toPlayersToPlay(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(this.id, this.board, this.players, 1)
  }


}
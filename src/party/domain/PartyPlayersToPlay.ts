import { Board } from "./Board"
import type { Party } from "./Party"
import { PartyMonstersToPlay } from "./PartyMonsterToPlay"
import { Player } from "./Player"

export class PartyPlayersToPlay implements Party {
  constructor(private board: Board, private players: Player[], private round: number) {
    this.board = board
    this.players = players
    this.round = round 
  }

  public getBoard(): Board {
    return this.board
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public toMonsterToPlay(players: Player[]): PartyMonstersToPlay {
    return new PartyMonstersToPlay(this.board, players, this.round + 1)
  }

}

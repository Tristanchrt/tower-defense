import { Board } from './Board'
import type { Party } from './Party'
import { PartyMonstersToPlay } from './PartyMonsterToPlay'
import { Player } from './Player'

export class PartyPlayersToPlay implements Party {
  id: string
  private playersPlayed: Player[]
  private readonly playersToPlay: Player[]

  constructor(
    id: string,
    private board: Board,
    private players: Player[],
    private round: number
  ) {
    this.id = id
    this.board = board
    this.players = players
    this.round = round
    this.playersPlayed = []
    this.playersToPlay = players
  }

  public getBoard(): Board {
    return this.board
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public toMonsterToPlay(players: Player[]): PartyMonstersToPlay {
    return new PartyMonstersToPlay(this.id, this.board, players, this.round + 1)
  }

  public getPlayerToPlay(): Player {
    return this.playersToPlay[0]
  }
}

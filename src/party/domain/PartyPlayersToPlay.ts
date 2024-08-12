import { Board } from './Board'
import type { Party } from './Party'
import { PartyMonstersToPlay } from './PartyMonsterToPlay'
import { Player } from './Player'
import { type Tower } from '@/party/domain/Tower'

export class PartyPlayersToPlay implements Party {
  id: string
  private readonly playersToPlay: Player[]

  constructor(
    id: string,
    private readonly board: Board,
    private readonly players: Player[],
    private round: number
  ) {
    this.id = id
    this.board = board
    this.players = players
    this.round = round
    this.playersToPlay = players
  }

  public getBoard(): Board {
    return this.board
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public getFirstPlayer(): Player {
    return this.getPlayers()[0]
  }

  public getLastPlayer(): Player {
    return this.getPlayers()[1]
  }

  public toMonsterToPlay(players: Player[]): PartyMonstersToPlay {
    return new PartyMonstersToPlay(this.id, this.board, players, this.round + 1)
  }

  public getTowers(): Tower[] {
    return this.getBoard().getTowers()
  }

  public play(tower: Tower) {
    this.board.addTower(tower)
  }
}

import { Board } from './Board'
import type { PartyPlay } from './Party'
import { PartyMonstersToPlay } from './PartyMonsterToPlay'
import { Player } from './Player'
import { type Tower } from '@/party/domain/Tower'
import { MonsterGenerator } from '@/party/domain/MonsterGenerator'
import { PartyEvents } from '@/party/domain/PartyEvents'

export class PartyPlayersToPlay implements PartyPlay {
  id: string

  constructor(
    id: string,
    private readonly board: Board,
    private readonly players: Player[],
    private towers: Tower[],
    private readonly round: number
  ) {
    this.id = id
    this.board = board
    this.players = players
    this.towers = towers
    this.round = round
  }

  display(): Board {
    return this.board.display(this.towers)
  }

  getRound(): number {
    return this.round
  }

  getBoard(): Board {
    return this.board
  }

  getPlayers(): Player[] {
    return this.players
  }

  getFirstPlayer(): Player {
    return this.getPlayers()[0]
  }

  getLastPlayer(): Player {
    return this.getPlayers()[1]
  }

  toMonsterToPlay(): PartyMonstersToPlay {
    return new PartyMonstersToPlay(
      this.id,
      this.board,
      this.players,
      this.towers,
      this.round + 1,
      new MonsterGenerator(10, (max) => Math.floor(Math.random() * max)),
      new PartyEvents()
    )
  }

  getTowers(): Tower[] {
    return this.towers
  }

  addTower(tower: Tower) {
    if (!this.getBoard().isInMatrix(tower.x, tower.y)) {
      throw new Error('Not in the matrix area')
    }
    this.towers.push(tower)
  }
}

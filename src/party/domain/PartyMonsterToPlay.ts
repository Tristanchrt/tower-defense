import { type Board } from './Board'
import type { Party } from './Party'
import { PartyPlayersToPlay } from './PartyPlayersToPlay'
import { type Player } from './Player'
import { Monster } from '@/party/domain/Monster'

export class PartyMonstersToPlay implements Party {
  id: string
  wave: number = 5
  monsters: Monster[] = []
  constructor(
    id: string,
    private readonly board: Board,
    private readonly players: Player[],
    private round: number
  ) {
    this.id = id
    this.board = board
    this.players = players
  }

  getBoard(): Board {
    return this.board
  }

  getPlayers(): Player[] {
    return this.players
  }

  getMonsters(): Monster[] {
    return this.monsters
  }

  waveRun(): void {
    this.monsters.push(this.generateMonsters())
  }

  toPlayersToPlay() {
    return new PartyPlayersToPlay(this.id, this.board, this.players, this.round)
  }

  play(): PartyPlayersToPlay {
    return this.toPlayersToPlay()
  }

  private generateMonsters(): Monster {
    return new Monster(0, this.randomY())
  }

  private randomY() {
    return Math.floor(Math.random() * this.getBoard().getHeight());
  }
}

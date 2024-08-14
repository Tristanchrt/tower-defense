import { type Board } from './Board'
import type { PartyPlay } from './Party'
import { PartyPlayersToPlay } from './PartyPlayersToPlay'
import { type Player } from './Player'
import { Monster } from '@/party/domain/Monster'
import type { Tower } from '@/party/domain/Tower'

export class PartyMonstersToPlay implements PartyPlay {
  id: string
  wave: number = 5
  monsters: Monster[] = []
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
    return this.board.display([...this.towers, ...this.monsters])
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

  getTowers(): Tower[] {
    return this.towers
  }

  waveMonster(): void {
    for (const monster of this.monsters) {
      monster.x += 1
    }
    this.monsters.push(this.generateMonsters())
  }

  waveTowers(): void {
    for (const tower of this.towers) {
      for (const monster of this.monsters) {
        if(this.hasRange(tower, monster) && tower.hasMunitions()){
          const index = this.monsters.indexOf(monster);
          if (index > -1) {
            this.monsters.splice(index, 1);
            tower.removeMunitions()
          }
          break
        }
      }
    }
  }

  toPlayersToPlay() {
    return new PartyPlayersToPlay(this.id, this.board, this.players, this.towers, this.round)
  }

  play(): PartyPlayersToPlay {
    return this.toPlayersToPlay()
  }

  private hasRange(tower: Tower, monster: Monster): boolean {
    const range =  1
    const withinRangeX = Math.abs(tower.x - monster.x) <= range;
    const withinRangeY = Math.abs(tower.y - monster.y) <= range;
    return withinRangeX && withinRangeY;
  }

  generateMonsters(): Monster {
    return new Monster(0, this.randomY())
  }

  private randomY() {
    return Math.floor(Math.random() * this.getBoard().getHeight());
  }
}

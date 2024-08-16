import { type Board } from './Board'
import type { PartyPlay } from './Party'
import { PartyPlayersToPlay } from './PartyPlayersToPlay'
import { type Player } from './Player'
import { Monster } from '@/party/domain/Monster'
import type { Tower } from '@/party/domain/Tower'
import { MonsterGenerator } from '@/party/domain/MonsterGenerator'

export class PartyMonstersToPlay implements PartyPlay {
  id: string
  wave: number = 10
  monsters: Monster[] = []
  constructor(
    id: string,
    private readonly board: Board,
    private readonly players: Player[],
    private towers: Tower[],
    private readonly round: number,
    private monsterGenerator: MonsterGenerator
  ) {
    this.id = id
    this.board = board
    this.players = players
    this.towers = towers
    this.round = round
    this.monsterGenerator = monsterGenerator
  }

  display(): Board {
    return this.board.display([...this.towers, ...this.monsters])
  }

  getRound(): number {
    return this.round
  }

  getBoard(): Board {
    return this.board
  }

  getHeightBoard(): number {
    return this.board.getHeight()
  }

  getPlayers(): Player[] {
    return this.players
  }

  getTowers(): Tower[] {
    return this.towers
  }

  toPlayersToPlay(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(this.id, this.board, this.players, this.towers, this.round)
  }

  // TODO to remove and move to domain service
  play(): PartyPlayersToPlay {
    this.wavePlay()
    return this.toPlayersToPlay()
  }

  private wavePlay(): void {
    for (let pas = 0; pas < this.wave; pas++) {
      this.waveMonster()
      this.waveTowers()
    }
  }

  // private displayEvents(): void {
  //   const events = this.eventDispatcher.getEvents();
  //   events.forEach(event => console.log(event.message));
  //   this.eventDispatcher.clearEvents();
  // }

  private waveMonster(): void {
    this.monsters.forEach((monster) => (monster.x += 1))
    this.monsters.push(this.monsterGenerator.generate())
  }

  private waveTowers(): void {
    this.towers.forEach((tower) => {
      this.waveTower(tower)
    })
  }

  private waveTower(tower: Tower): void {
    this.monsters.forEach((monster, index) => {
      if (this.hasRange(tower, monster) && tower.hasMunitions()) {
        this.monsters.splice(index, 1)
        tower.removeMunitions()
        return
      }
    })
  }

  private hasRange(tower: Tower, monster: Monster): boolean {
    const range = 1
    return Math.abs(tower.x - monster.x) <= range && Math.abs(tower.y - monster.y) <= range
  }
}

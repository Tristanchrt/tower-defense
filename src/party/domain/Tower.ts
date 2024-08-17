import type { Cell } from './Cell'
import type { Player } from './Player'
import type { Monster } from '@/party/domain/Monster'

export class Tower implements Cell {
  constructor(
    x: number,
    y: number,
    private munitions: number,
    private readonly player: Player
  ) {
    this.x = x
    this.y = y
    this.munitions = munitions
    this.player = player
    this.range = 1
  }
  x: number
  y: number
  range: number

  getMunitions(): number {
    return this.munitions
  }

  attack(monsters: Monster[]): void {
    if (this.munitions <= 0) return;

    const target = monsters.find(monster => this.isInRange(monster));
    if (target) {
      this.fireAt(target);
      this.munitions -= 1;
    }
  }

  private isInRange(monster: Monster): boolean {
    return Math.abs(monster.x - this.x) <= this.range && Math.abs(monster.y - this.y) <= this.range;
  }

  private fireAt(monster: Monster): void {
    monster.takeDommage()
  }
}

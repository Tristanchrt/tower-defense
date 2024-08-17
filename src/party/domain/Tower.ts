import type { Cell } from './Cell'
import type { Player } from './Player'

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
  }
  x: number
  y: number

  hasMunitions(): boolean {
    return this.munitions > 0
  }

  removeMunitions(): void {
    if(this.hasMunitions()) {
      this.munitions -= 1
    }
  }

  getMunitions(): number {
    return this.munitions
  }

  // TODO·
  // attack(monsters: Monster[]): void {
  //   if (this.munitions <= 0) return;
  //
  //   const target = monsters.find(monster => this.isInRange(monster));
  //   if (target) {
  //     this.fireAt(target);
  //     this.munitions--;
  //   }
  // }
  //
  // private isInRange(monster: Monster): boolean {
  //   return Math.abs(monster.x - this.x) <= this.range && Math.abs(monster.y - this.y) <= this.range;
  // }
  //
  // private fireAt(monster: Monster): void {
  //   monster.takeDamage(10); // Example damage value
  //   // Trigger event for UI update, sound, etc.
  // }
}

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

  public hasMunitions(): boolean {
    return this.munitions > 0
  }

  public removeMunitions(): void {
    this.munitions -= 1
  }

  public getMunitions(): number {
    return this.munitions
  }

  public getPlayer(): Player {
    return this.player
  }
}

import type { Tower } from './Tower'

export class Player {
  // private towers: Tower[] = []

  constructor(private name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  // public getTowers() {
  //     return this.towers
  // }

  // public addTower(tower: Tower): void {
  //     this.towers.push(tower)
  // }
}

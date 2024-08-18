import type { Cell } from '@/party/domain/Cell'

export class Monster implements Cell {
  id: string
  x: number
  y: number
  health: number

  constructor(x: number, y: number, health: number) {
    this.id = this.randomId(x, y)
    this.x = x
    this.y = y
    this.health = health
  }

  moveTo(): void {
    this.x++
  }

  isAlive(): boolean {
    return this.health !== 0
  }

  takeDommage(): void {
    this.health -= 1
    if (this.health < 0) this.health = 0
  }

  private randomId(x: number, y: number): string {
    return (x + 3 + (y + 2) * 5).toString()
  }
}

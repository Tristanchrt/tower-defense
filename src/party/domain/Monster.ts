import type { Cell } from '@/party/domain/Cell'

export class Monster implements Cell {
  id: number
  x: number
  y: number

  constructor(x: number, y: number) {
    this.id = this.randomId(x, y)
    this.x = x
    this.y = y
  }

  private randomId(x: number, y: number): number {
    return x + 3 + (y + 2) * 5
  }
}

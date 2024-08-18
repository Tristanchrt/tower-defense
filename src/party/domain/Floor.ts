import type { Cell } from './Cell'

export class Floor implements Cell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.id = this.randomId(x, y)
  }
  id: string
  x: number
  y: number

  private randomId(x: number, y: number): string {
    return (x + 2 + (y + 8) * 21).toString()
  }
}

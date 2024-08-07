import type { Cell } from './Cell'

export class Floor implements Cell {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  x: number
  y: number
}

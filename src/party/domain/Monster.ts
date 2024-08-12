import type { Cell } from '@/party/domain/Cell'

export class Monster implements Cell {
  x: number
  y: number

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
import type { Cell } from './Cell'
import { Floor } from './Floor'
import type { Tower } from './Tower'

export class Board {
  matrix: Cell[][]

  constructor(
    private readonly width: number,
    private readonly height: number
  ) {
    this.width = width
    this.height = height
    this.matrix = this.initMatrix(width, height)
  }

  private initMatrix(width: number, height: number): Cell[][] {
    const matrix = []
    for (let i = 0; i < width; i++) {
      const row = []
      for (let j = 0; j < height; j++) {
        row.push(new Floor(i, j))
      }
      matrix.push(row)
    }
    return matrix
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }

  public addTower(tower: Tower): void {
    if (!this.isInMatrix(tower.x, tower.y)) {
      throw new Error('Not in the matrix area')
    }
    this.matrix[tower.x][tower.y] = tower
  }

  public isInMatrix(x: number, y: number): boolean {
    try {
      const val = this.matrix[x][y]
      return val != undefined
    } catch {
      return false
    }
  }

  public getMatrix(): Cell[][] {
    return this.matrix
  }
}

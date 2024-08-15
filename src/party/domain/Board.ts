import type { Cell } from './Cell'
import { Floor } from './Floor'

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
    return Array.from({ length: width }, (_, i) =>
      Array.from({ length: height }, (_, j) => new Floor(i, j))
    )
  }

  public display(pieces: Cell[]): Board {
    for (const piece of pieces) {
      this.matrix[piece.x][piece.y] = piece
    }
    return this
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
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

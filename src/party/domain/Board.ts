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

  display(pieces: Cell[]): Board {
    for (const piece of pieces) {
      this.matrix[piece.x][piece.y] = piece
    }
    return this
  }

  getWidth(): number {
    return this.width
  }

  getHeight(): number {
    return this.height
  }

  isInMatrix(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.height
  }

  getMatrix(): Cell[][] {
    return this.matrix
  }

  private initMatrix(width: number, height: number): Cell[][] {
    return Array.from({ length: width }, (_, i) =>
      Array.from({ length: height }, (_, j) => new Floor(i, j))
    )
  }
}

import type { Cell } from './Cell'
import { Floor } from './Floor'

export class Board {
  matrix: Cell[][]
  pieces: Cell[]

  constructor(
    private readonly width: number,
    private readonly height: number
  ) {
    this.width = width
    this.height = height
    this.pieces = []
    this.matrix = this.initMatrix(width, height)
  }

  updateCell(cell: Cell) {
    this.pieces = this.pieces.filter((piece) => piece.id != cell.id)
    this.pieces.push(cell)
    this.display(this.pieces)
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
      Array.from({ length: height }, (_, j) => {
        const floorCell = new Floor(i, j)
        this.pieces.push(floorCell)
        return floorCell
      })
    )
  }
}

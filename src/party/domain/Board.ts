import type { Cell } from './Cell'
import { Floor } from './Floor'

// TODO Change board to only display it
export class Board {
  matrix: Cell[][]
  pieces: Record<string, Cell>

  constructor(
    private readonly width: number,
    private readonly height: number
  ) {
    this.width = width
    this.height = height
    this.pieces = {}
    this.matrix = this.initMatrix(width, height)
  }

  updateCell(cell: Cell) {
    const existingCell = this.pieces[cell.id];

    if (existingCell) {
      this.matrix[existingCell.x][existingCell.y] = new Floor(existingCell.x, existingCell.y);
    }

    if(this.isInMatrix(cell.x, cell.y)) {
      this.pieces[cell.id] = cell;
      this.matrix[cell.x][cell.y] = cell;
    }
  }

  display(pieces: Cell[]): Board {
    for (const piece of pieces) {
      this.updateCell(piece)
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
        this.pieces[floorCell.id] = floorCell
        return floorCell
      })
    )
  }
}

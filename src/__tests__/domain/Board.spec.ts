import { Floor } from '@/party/domain/Floor'
import { PartyFixture } from './PartyFixture'
import { describe, expect, test } from 'vitest'

describe('Board', () => {
  test('Should create a board when constructor is called', () => {
    const board = PartyFixture.board()

    expect(board.getWidth()).toBe(10)
    expect(board.getHeight()).toBe(10)
    expect(board.getMatrix()[0].length).toBe(10)
    expect(board.getMatrix()[1].length).toBe(10)
    expect(board.getMatrix()[0][0]).toStrictEqual(new Floor(0, 0))
  })

  test('Should display all pieces from parameters list', () => {
    const board = PartyFixture.board()
    const pieces = [PartyFixture.towerToAddPlayer1(0, 0)]
    board.display(pieces)
    expect(board.matrix[0][0]).toStrictEqual(PartyFixture.towerToAddPlayer1(0, 0))
  })

  test('Should update cell positions', () => {
    const board = PartyFixture.board()
    const tower = PartyFixture.towerToAddPlayer1(0, 0)
    const pieces = [tower]
    board.display(pieces)
    tower.x++
    board.updateCell(tower)
    expect(board.matrix[0][0]).toBeInstanceOf(Floor)
    expect(board.matrix[1][0]).toStrictEqual(tower)
  })
})

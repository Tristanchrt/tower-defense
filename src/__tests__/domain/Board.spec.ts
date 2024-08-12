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

  test('Should place tower when x or y are in the matrix area', () => {
    const board = PartyFixture.board()
    const towerToAdd = PartyFixture.towerToAddPlayer1(1, 1)
    board.addTower(towerToAdd)
    expect(board.getMatrix()[1][1]).toStrictEqual(towerToAdd)
  })

  test('Should not place tower when x or y are not in the matrix area', () => {
    const board = PartyFixture.board()
    const tower = PartyFixture.towerToAddPlayer1(100, 100)
    expect(() => board.addTower(tower)).toThrowError('Not in the matrix area')
  })

  test('Should get towers', () => {
    const board = PartyFixture.board()
    const tower = PartyFixture.towerToAddPlayer1(2, 2)
    board.addTower(tower)
    expect(board.getTowers()[0]).toStrictEqual(tower)
  })

  test('Should get monsters', () => {
    const board = PartyFixture.board()
    const monster = PartyFixture.monsterOne(0, 4)
    board.addMonster(monster)
    expect(board.getMonsters()[0]).toStrictEqual(monster)
  })
})

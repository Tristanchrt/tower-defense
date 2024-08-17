import { describe, expect, test } from 'vitest'
import { Monster } from '@/party/domain/Monster'

describe('Monster lifecycle', () => {
  test('Should have not an alive monster when health is at 0', () => {
    const monster = new Monster(0, 0, 0)
    expect(monster.isAlive()).toEqual(false)
  })

  test('Should have not an alive monster when health is superior at 0', () => {
    const monster = new Monster(0, 0, 1)
    expect(monster.isAlive()).toEqual(true)
  })

  test('Should health reduce by 1 when take Dommage', () => {
    const monster = new Monster(0, 0, 1)
    monster.takeDommage()
    monster.takeDommage()
    expect(monster.isAlive()).toEqual(false)
  })
})

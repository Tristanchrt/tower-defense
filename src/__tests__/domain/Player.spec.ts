import { Tower } from '@/party/domain/Tower'
import { PartyFixture } from './PartyFixture'
import { describe, expect, test } from 'vitest'

describe('Player', () => {
  const player = PartyFixture.player1()

  test('Should init player', () => {
    expect(player.getName()).toBe('player1')
  })

  // test('Should add tower', () => {
  //     const tower = new Tower(1, 1, 10)
  //     player.addTower(tower)
  //     const towers = player.getTowers()
  //     expect(towers[0]).toBe(tower)
  // })
})

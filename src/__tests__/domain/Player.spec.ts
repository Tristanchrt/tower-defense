import { PartyFixture } from './PartyFixture'
import { describe, expect, test } from 'vitest'

describe('Player', () => {
  const player = PartyFixture.player1()

  test('Should init player', () => {
    expect(player.getName()).toBe('player1')
  })
})

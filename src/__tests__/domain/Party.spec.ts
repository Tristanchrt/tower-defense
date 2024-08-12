import { PartyFixture } from './PartyFixture'
import { describe, expect, test } from 'vitest'

describe('Party', () => {
  test('should init Party object', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    expect(partyPlayersToPlay.getBoard()).toStrictEqual(PartyFixture.board())
  })

  test('Should PartyCreated change to PartyPlayersToPlay.vue', () => {
    const partyCreated = PartyFixture.partyCreated()
    const partyPlayersToPlay = partyCreated.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should PartyPlayersToPlay.vue change to PartyMonsterToPlay', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const partyMonstersToPlay = partyPlayersToPlay.toMonsterToPlay()
    expect(partyMonstersToPlay).toStrictEqual(PartyFixture.partyMonstersToPlayRoundTwo())
  })

  test('Should PartyMonsterToPlay change to PartyPlayersToPlay.vue', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    const partyPlayersToPlay = partyMonstersToPlay.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwo())
  })

  test('Should add tower when player 1 is playing', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const tower = PartyFixture.towerToAddPlayer1(1, 1)
    partyPlayersToPlay.play(tower)
    expect(partyPlayersToPlay.getTowers()[0]).toStrictEqual(tower)
  })
})

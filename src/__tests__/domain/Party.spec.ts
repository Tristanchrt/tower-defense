import { PartyHandler } from '@/party/domain/PartyHandler';
import { PartyFixture } from './PartyFixture';
import {describe, expect, test } from 'vitest'

describe('Party', () => {

  test('should init Party object', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    expect(partyPlayersToPlay.getBoard()).toStrictEqual(PartyFixture.board())
  })

  test('Should PartyCreated change to PartyPlayersToPlay', () => {
    const partyCreated = PartyFixture.partyCreated()
    const partyPlayersToPlay = partyCreated.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should PartyPlayersToPlay change to PartyMonsterToPlay', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const partyMonstersToPlay = partyPlayersToPlay.toMonsterToPlay([PartyFixture.player1(), PartyFixture.player2()])
    expect(partyMonstersToPlay).toStrictEqual(PartyFixture.partyMonstersToPlayRoundTwo())
  })

  test('Should PartyMonsterToPlay change to PartyPlayersToPlay', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    const partyPlayersToPlay = partyMonstersToPlay.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwo())
  })

});
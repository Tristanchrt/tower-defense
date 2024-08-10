import { PartyHandler } from '@/party/domain/PartyHandler'
import { describe, expect, test, vi } from 'vitest'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'

describe('Party Handler', () => {
  test('Should create party when calling creator', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const createdParty = partyHandler.createParty(PartyFixture.partyToCreate())

    expect(mockPartiesRepository.saveParty).toHaveBeenCalledWith(createdParty)
    expect(createdParty).toStrictEqual(PartyFixture.partyCreated())
  })

  test('Should get parties',  () => {

    const party = PartyFixture.partyCreated()

    const mockPartiesRepository = {
      getParties: vi.fn().mockReturnValue([party]),
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const parties = partyHandler.getParties()
    expect(mockPartiesRepository.getParties).toHaveBeenCalled()
    expect(parties).toStrictEqual([party])
  })

  test('Should transform partyCreated to PartyPlayersToPlayer', () => {

    const mockPartiesRepository = {
      saveParty: vi.fn(),
      withPlayersToPlay: vi.fn()
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const partyPlayersToPlayer = partyHandler.withPlayersToPlay(PartyFixture.partyCreated())

    expect(partyPlayersToPlayer).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

})

import { describe, expect, test, vi } from 'vitest'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import type { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'

describe('Parties application service test', () => {
  test('Should create a party', () => {
    const mockRestPartiesRepository = {
      saveParty: vi.fn(),
    }
    const partiesApplicationService = new PartiesApplicationService(mockRestPartiesRepository as unknown as RestPartiesRepository)

    const createParty = partiesApplicationService.create(PartyFixture.partyToCreate())

    expect(createParty).toEqual(PartyFixture.partyCreated())
  })

  test('Should get parties', () => {
    const party = PartyFixture.partyCreated()

    const mockRestPartiesRepository = {
      getParties: vi.fn().mockReturnValue([party]),
    }
    const partiesApplicationService = new PartiesApplicationService(mockRestPartiesRepository as unknown as RestPartiesRepository)

    const parties = partiesApplicationService.getParties()

    expect(parties).toStrictEqual([party])
  })

  test('Should transform partyCreated to PartyPlayersToPlayer', () => {
    const mockRestPartiesRepository = {
      saveParty: vi.fn(),
      withPlayersToPlay: vi.fn(),
    }

    const partiesApplicationService = new PartiesApplicationService(mockRestPartiesRepository as unknown as RestPartiesRepository)

    const partyPlayersToPlay = partiesApplicationService.withPlayersToPlay(PartyFixture.partyCreated())

    expect(partyPlayersToPlay).toEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

})
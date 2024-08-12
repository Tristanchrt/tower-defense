import { describe, expect, test, vi } from 'vitest'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import type { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'

describe('Parties application service test', () => {
  test('Should create a party', () => {
    const mockRestPartiesRepository = {
      saveParty: vi.fn()
    }
    const partiesApplicationService = new PartiesApplicationService(
      mockRestPartiesRepository as unknown as RestPartiesRepository
    )

    const createParty = partiesApplicationService.create(PartyFixture.partyToCreate())

    expect(createParty).toEqual(PartyFixture.partyCreated())
  })

  test('Should get parties', () => {
    const party = PartyFixture.partyCreated()

    const mockRestPartiesRepository = {
      getParties: vi.fn().mockReturnValue([party])
    }
    const partiesApplicationService = new PartiesApplicationService(
      mockRestPartiesRepository as unknown as RestPartiesRepository
    )

    const parties = partiesApplicationService.getParties()

    expect(parties).toStrictEqual([party])
  })

  test('Should transform partyCreated to PartyPlayersToPlayer', () => {
    const mockRestPartiesRepository = {
      saveParty: vi.fn()
    }

    const partiesApplicationService = new PartiesApplicationService(
      mockRestPartiesRepository as unknown as RestPartiesRepository
    )

    const partyPlayersToPlay = partiesApplicationService.toPlayersToPlay(
      PartyFixture.partyCreated()
    )

    expect(partyPlayersToPlay).toEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should get party by ID', () => {
    const party = PartyFixture.partyCreated()

    const mockRestPartiesRepository = {
      getPartyById: vi.fn().mockReturnValue(party)
    }

    const partiesApplicationService = new PartiesApplicationService(
      mockRestPartiesRepository as unknown as RestPartiesRepository
    )

    const parties = partiesApplicationService.getPartyById('id')
    expect(parties).toStrictEqual(party)
  })

  test('Should transform PartyPlayersToPlayer to PartyMonsterToPlay', () => {
    const mockRestPartiesRepository = {
      saveParty: vi.fn()
    }

    const partiesApplicationService = new PartiesApplicationService(
      mockRestPartiesRepository as unknown as RestPartiesRepository
    )

    const partyMonsterToPlay = partiesApplicationService.toMonsterToPlay(
      PartyFixture.partyPlayersToPlayRoundOne()
    )

    expect(partyMonsterToPlay).toStrictEqual(PartyFixture.partyMonstersToPlayRoundTwo())
  })
})

import { PartyHandler } from '@/party/domain/PartyHandler'
import { describe, expect, test, vi } from 'vitest'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'
import { omitFields } from '@/__tests__/assertion'
import type { PartyEventsRepository } from '@/party/domain/PartyEventsRepository'

describe('Party Handler', () => {
  const mockPartiesEventRepository = {
    saveEventsParty: vi.fn(),
    getEvents: vi.fn().mockReturnValue([PartyFixture.eventsParty()])
  }

  test('Should create party when calling creator', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const createdParty = partyHandler.createParty(PartyFixture.partyToCreate())

    expect(mockPartiesRepository.saveParty).toHaveBeenCalledWith(createdParty)
    expect(createdParty).toStrictEqual(PartyFixture.partyCreated())
  })

  test('Should get parties', () => {
    const party = PartyFixture.partyCreated()

    const mockPartiesRepository = {
      getParties: vi.fn().mockReturnValue([party])
    }
    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const parties = partyHandler.getParties()
    expect(mockPartiesRepository.getParties).toHaveBeenCalled()
    expect(parties).toStrictEqual([party])
  })

  test('Should transform partyCreated to PartyPlayersToPlayer', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const partyPlayersToPlayer = partyHandler.toCreateParty(PartyFixture.partyCreated())

    expect(partyPlayersToPlayer).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should get party by ID', () => {
    const party = PartyFixture.partyCreated()

    const mockPartiesRepository = {
      getPartyById: vi.fn().mockReturnValue(party)
    }
    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const parties = partyHandler.getPartyById('id')
    expect(mockPartiesRepository.getPartyById).toHaveBeenCalled()
    expect(parties).toStrictEqual(party)
  })

  test('Should transform PartyPlayersToPlayer to PartyMonsterToPlay', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const partyMonsterToPlay = partyHandler.toMonsterParty(
      PartyFixture.partyPlayersToPlayRoundOne()
    )

    const fieldsToIgnore = ['monsterGenerator']
    const partyExpectedNoRandom = omitFields(partyMonsterToPlay, fieldsToIgnore)
    const partyFixtureNoRandom = omitFields(
      PartyFixture.partyMonstersToPlayRoundTwo(),
      fieldsToIgnore
    )

    expect(partyExpectedNoRandom).toStrictEqual(partyFixtureNoRandom)
  })

  test('Should PartyMonsterToPlay play and return PartyPlayersToPlayer', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }

    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTowers()

    const party = partyHandler.monsterPlay(partyMonstersToPlay)

    expect(party).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwoWithTowers())
    expect(mockPartiesRepository.saveParty).toHaveBeenCalled()
    expect(mockPartiesEventRepository.saveEventsParty).toHaveBeenCalled()
  })

  test('Should add tower when PartyPlayersToPlayer is playing', () => {
    const party = PartyFixture.partyPlayersToPlayRoundOne()
    const tower = PartyFixture.towerToAddPlayer1(0, 0)

    const mockPartiesRepository = {
      saveParty: vi.fn(),
      getPartyById: vi.fn().mockReturnValue(party)
    }

    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    partyHandler.addTowerToParty(party.id, tower)

    expect(mockPartiesRepository.saveParty).toHaveBeenCalledOnce()
  })

  test('Should get events when RestPartyEventsRepository is called', () => {
    const party = PartyFixture.partyPlayersToPlayRoundOne()

    const mockPartiesRepository = {}

    const partyHandler = new PartyHandler(
      mockPartiesRepository as unknown as PartiesRepository,
      mockPartiesEventRepository as unknown as PartyEventsRepository
    )

    const eventsParty = partyHandler.getEvents(party.id)

    expect(eventsParty).toStrictEqual([PartyFixture.eventsParty()])
  })
})

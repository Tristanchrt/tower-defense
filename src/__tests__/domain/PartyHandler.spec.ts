import { PartyHandler } from '@/party/domain/PartyHandler'
import { describe, expect, test, vi } from 'vitest'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'
import { Monster } from '@/party/domain/Monster'

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

  test('Should get parties', () => {
    const party = PartyFixture.partyCreated()

    const mockPartiesRepository = {
      getParties: vi.fn().mockReturnValue([party])
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const parties = partyHandler.getParties()
    expect(mockPartiesRepository.getParties).toHaveBeenCalled()
    expect(parties).toStrictEqual([party])
  })

  test('Should transform partyCreated to PartyPlayersToPlayer', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const partyPlayersToPlayer = partyHandler.toCreateParty(PartyFixture.partyCreated())

    expect(partyPlayersToPlayer).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should get party by ID', () => {
    const party = PartyFixture.partyCreated()

    const mockPartiesRepository = {
      getPartyById: vi.fn().mockReturnValue(party)
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const parties = partyHandler.getPartyById('id')
    expect(mockPartiesRepository.getPartyById).toHaveBeenCalled()
    expect(parties).toStrictEqual(party)
  })

  test('Should transform PartyPlayersToPlayer to PartyMonsterToPlay', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const partyMonsterToPlay = partyHandler.toMonsterParty(
      PartyFixture.partyPlayersToPlayRoundOne()
    )

    expect(partyMonsterToPlay).toStrictEqual(PartyFixture.partyMonstersToPlayRoundTwo())
  })

  test('Should PartyMonsterToPlay play and return PartyPlayersToPlayer', () => {
    const mockPartiesRepository = {
      saveParty: vi.fn()
    }
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository)

    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTowers()

    vi.spyOn(partyMonstersToPlay, 'generateMonster').mockReturnValue(new Monster(1, 1))

    const party = partyHandler.monsterPlay(partyMonstersToPlay)

    expect(party).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwoWithTowers())
  })
})

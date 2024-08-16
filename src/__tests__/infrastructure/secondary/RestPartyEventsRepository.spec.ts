import { describe, expect, test } from 'vitest'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'
import { EventParty } from '@/party/domain/EventParty'
import { RestPartyEventsRepository } from '@/party/infrastructure/secondary/RestPartyEventsRepository'
import { EventToSave } from '@/party/domain/PartyEventsRepository'

describe('RestPartiesEventsRepository', () => {
  const rest = new RestPartyEventsRepository()

  test('Should add and get events', () => {
    const event = new EventParty('Tower shot', PartyFixture.towerToAddPlayer1(0, 0), 1)
    const party = PartyFixture.partyMonstersToPlayRoundTwo()

    rest.saveEventsParty(new EventToSave(party.id, [event]))

    expect(rest.getEvents(party.id)).toStrictEqual([event])
  })
})

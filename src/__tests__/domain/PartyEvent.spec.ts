import { PartyFixture } from './PartyFixture'
import { describe, expect, test } from 'vitest'
import { EventParty } from '@/party/domain/EventParty'

describe('PartyEvent', () => {
  test('Should get events from party', () => {
    const partyEvent = PartyFixture.partyEvents()
    const event = new EventParty('Tower shot', PartyFixture.towerToAddPlayer1(0, 0), 1)

    partyEvent.saveEvent(event)

    expect(partyEvent.getEvents()[0]).toEqual(event)
  })
})

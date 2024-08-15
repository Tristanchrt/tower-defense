import { PartyFixture } from './PartyFixture'
import { describe, expect, test, vi } from 'vitest'
import { EventParty, ActionEvent } from '@/party/domain/EventParty'

describe('PartyEvent', () => {
  test('Should get events from party', () => {
    const partyEvent = PartyFixture.partyEvents()

    const party = PartyFixture.partyMonstersToPlayRoundTwo()

    const event = new EventParty(party.id, ActionEvent.ADD, PartyFixture.towerToAddPlayer1(0,0))

    partyEvent.saveEvent(event)

    expect(partyEvent.getEvents(party.id).length).toEqual(1)
    expect(partyEvent.getEvents(party.id)[0]).toEqual(event)
  })
})
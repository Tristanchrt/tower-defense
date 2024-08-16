import type { EventParty } from '@/party/domain/EventParty'

export class EventToSave {
  partyId: string
  events: EventParty[]

  constructor(partyId: string, events: EventParty[]) {
    this.partyId = partyId
    this.events = events
  }
}

export interface PartyEventsRepository {
  saveEventsParty(event: EventToSave): void
  getEvents(partyId: string): EventParty[]
}

import { EventParty } from '@/party/domain/EventParty'

export class PartyEvents {
  events: EventParty[] = []
  constructor() {}

  getEvents(): EventParty[] {
    return this.events
  }

  saveEvent(eventParty: EventParty) {
    this.events.push(eventParty)
  }
}

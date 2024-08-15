import { EventParty } from '@/party/domain/EventParty'

export class PartyEvents {
  events: Record<string, EventParty[]> = {}
  constructor() {}

  getEvents(party: string): EventParty[] {
    return this.events[party] || [];
  }

  saveEvent(eventParty: EventParty) {
    if (!this.events[eventParty.id]) {
      this.events[eventParty.id] = [];
    }
    this.events[eventParty.id].push(eventParty);
  }
}
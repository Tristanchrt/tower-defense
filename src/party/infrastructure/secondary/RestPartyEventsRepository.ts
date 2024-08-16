import { EventToSave, type PartyEventsRepository } from '@/party/domain/PartyEventsRepository'
import { EventParty } from '@/party/domain/EventParty'

export class RestPartyEventsRepository implements PartyEventsRepository {
  private events: Record<string, EventParty[]> = {}

  getEvents(partyId: string): EventParty[] {
    return this.events[partyId] || []
  }

  saveEventsParty(event: EventToSave): void {
    if (!this.events[event.partyId]) {
      this.events[event.partyId] = []
    }
    this.events[event.partyId] = [...this.events[event.partyId], ...event.events]
  }
}

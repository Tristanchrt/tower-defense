import { PartyHandler } from '@/party/domain/PartyHandler'
import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import type { RestPartyEventsRepository } from '@/party/infrastructure/secondary/RestPartyEventsRepository'
import type { Tower } from '@/party/domain/Tower'
import type { PartyEvents } from '@/party/domain/PartyEvents'
import type { EventParty } from '@/party/domain/EventParty'

export class PartiesApplicationService {
  private partyHandler: PartyHandler

  constructor(
    private restPartiesRepository: RestPartiesRepository,
    private restPartyEventsRepository: RestPartyEventsRepository
  ) {
    this.partyHandler = new PartyHandler(restPartiesRepository, restPartyEventsRepository)
  }

  create(party: PartyToCreate): PartyCreated {
    return this.partyHandler.createParty(party)
  }

  getParties(): Party[] {
    return this.partyHandler.getParties()
  }

  toPlayersToPlay(party: PartyCreated): PartyPlayersToPlay {
    return this.partyHandler.toCreateParty(party)
  }

  toMonsterToPlay(party: PartyPlayersToPlay) {
    return this.partyHandler.toMonsterParty(party)
  }

  getPartyById(id: string) {
    return this.partyHandler.getPartyById(id)
  }

  monsterPlay(party: PartyMonstersToPlay) {
    return this.partyHandler.monsterPlay(party)
  }

  addTowerToParty(partyId: string, tower: Tower) {
    return this.partyHandler.addTowerToParty(partyId, tower)
  }

  getEvents(partyId: string): EventParty[] {
    return this.partyHandler.getEvents(partyId)
  }
}

import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { EventToSave, type PartyEventsRepository } from '@/party/domain/PartyEventsRepository'
import type { Tower } from '@/party/domain/Tower'
import type { EventParty } from '@/party/domain/EventParty'

// TODO split class
export class PartyHandler {
  constructor(
    private partiesRepository: PartiesRepository,
    private partyEventsRepository: PartyEventsRepository
  ) {}

  createParty(partyToCreate: PartyToCreate): PartyCreated {
    const partyCreated = partyToCreate.create()
    this.partiesRepository.saveParty(partyCreated)
    return partyCreated
  }

  getParties(): Party[] {
    return this.partiesRepository.getParties()
  }

  getPartyById(id: string): Party {
    return this.partiesRepository.getPartyById(id)
  }

  toCreateParty(party: PartyCreated): PartyPlayersToPlay {
    const partyPlayerToPlay = party.toPlayersToPlay()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }

  toMonsterParty(party: PartyPlayersToPlay): PartyMonstersToPlay {
    const partyMonsterToPlay = party.toMonsterToPlay()
    this.partiesRepository.saveParty(partyMonsterToPlay)
    return partyMonsterToPlay
  }

  monsterPlay(party: PartyMonstersToPlay): PartyPlayersToPlay {
    party.wavePlay()
    this.partyEventsRepository.saveEventsParty(new EventToSave(party.id, party.getEvents()))
    const partyPlayerToPlay = party.toPlayersToPlay()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }

  addTowerToParty(partyId: string, tower: Tower) {
    const party = this.getPartyById(partyId) as PartyPlayersToPlay
    party.addTower(tower)
    this.partiesRepository.saveParty(party)
  }

  getEvents(partyId: string): EventParty[] {
    return this.partyEventsRepository.getEvents(partyId)
  }
}

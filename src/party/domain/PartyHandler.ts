import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { EventToSave, type PartyEventsRepository } from '@/party/domain/PartyEventsRepository'

export class PartyHandler {
  constructor(
    private partiesRepository: PartiesRepository,
    private partyEventsRepository: PartyEventsRepository
  ) {}

  public createParty(partyToCreate: PartyToCreate): PartyCreated {
    const partyCreated = partyToCreate.create()
    this.partiesRepository.saveParty(partyCreated)
    return partyCreated
  }

  public getParties(): Party[] {
    return this.partiesRepository.getParties()
  }

  public getPartyById(id: string): Party {
    return this.partiesRepository.getPartyById(id)
  }

  public toCreateParty(party: PartyCreated): PartyPlayersToPlay {
    const partyPlayerToPlay = party.toPlayersToPlay()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }

  public toMonsterParty(party: PartyPlayersToPlay): PartyMonstersToPlay {
    const partyMonsterToPlay = party.toMonsterToPlay()
    this.partiesRepository.saveParty(partyMonsterToPlay)
    return partyMonsterToPlay
  }

  public monsterPlay(party: PartyMonstersToPlay): PartyPlayersToPlay {
    party.wavePlay()
    party.displayEvents()
    this.partyEventsRepository.saveEventsParty(new EventToSave(party.id, party.getEvents()))
    const partyPlayerToPlay = party.toPlayersToPlay()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }
}

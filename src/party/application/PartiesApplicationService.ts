import { PartyHandler } from '@/party/domain/PartyHandler'
import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import type { RestPartyEventsRepository } from '@/party/infrastructure/secondary/RestPartyEventsRepository'
import type { Tower } from '@/party/domain/Tower'

export class PartiesApplicationService {
  private partyHandler: PartyHandler

  constructor(
    private restPartiesRepository: RestPartiesRepository,
    private restPartyEventsRepository: RestPartyEventsRepository
  ) {
    this.partyHandler = new PartyHandler(restPartiesRepository, restPartyEventsRepository)
  }

  public create(party: PartyToCreate): PartyCreated {
    return this.partyHandler.createParty(party)
  }

  public getParties(): Party[] {
    return this.partyHandler.getParties()
  }

  public toPlayersToPlay(party: PartyCreated): PartyPlayersToPlay {
    return this.partyHandler.toCreateParty(party)
  }

  public toMonsterToPlay(party: PartyPlayersToPlay) {
    return this.partyHandler.toMonsterParty(party)
  }

  public getPartyById(id: string) {
    return this.partyHandler.getPartyById(id)
  }

  public monsterPlay(party: PartyMonstersToPlay) {
    return this.partyHandler.monsterPlay(party)
  }

  public addTowerToParty(partyId: string, tower: Tower) {
    return this.partyHandler.addTowerToParty(partyId, tower)
  }
}

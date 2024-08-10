import { PartyHandler } from '@/party/domain/PartyHandler'
import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'

export class PartiesApplicationService {
  private partyHandler: PartyHandler

  constructor(private restPartiesRepository: RestPartiesRepository) {
    this.partyHandler = new PartyHandler(restPartiesRepository)
  }

  public create(party: PartyToCreate): PartyCreated {
    return this.partyHandler.createParty(party)
  }

  public getParties(): Party[] {
    return this.partyHandler.getParties()
  }

  public withPlayersToPlay(party: PartyCreated): PartyPlayersToPlay {
    return this.partyHandler.withPlayersToPlay(party)
  }
}

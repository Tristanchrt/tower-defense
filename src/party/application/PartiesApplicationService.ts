import { PartyHandler } from '@/party/domain/PartyHandler'
import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'

export class PartiesApplicationService {
  private partyHandler: PartyHandler

  constructor() {
    this.partyHandler = new PartyHandler(new RestPartiesRepository())
  }

  public create(partyToCreate: PartyToCreate): PartyCreated {
    return this.partyHandler.createParty(partyToCreate)
  }

}
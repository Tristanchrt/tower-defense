import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { PartyCreated } from '@/party/domain/PartyCreated'

export class PartyHandler {

  constructor(private partiesRepository: PartiesRepository) {}

  public createParty(partyToCreate: PartyToCreate): PartyCreated {
    const partyCreated = partyToCreate.create()
    this.partiesRepository.saveParty(partyCreated)
    return partyCreated
  }
}
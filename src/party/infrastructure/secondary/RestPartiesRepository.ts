import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { Party } from '@/party/domain/Party'

export class RestPartiesRepository implements PartiesRepository {
  private party: Party = {} as Party

  public getParty(): Party {
    return this.party
  }

  public saveParty(party: Party): void {
    this.party = party
  }
}
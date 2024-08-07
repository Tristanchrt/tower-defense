import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { Party } from '@/party/domain/Party'

export class RestPartiesRepository implements PartiesRepository {
  private readonly parties: Party[] = []

  public getParties(): Party[] {
    return this.parties
  }

  public saveParty(party: Party): void {
    this.parties.push(party)
  }
}
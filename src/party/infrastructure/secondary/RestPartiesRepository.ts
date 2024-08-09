import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { Party } from '@/party/domain/Party'

export class RestPartiesRepository implements PartiesRepository {
  private parties: Party[] = [] as Party[]

  public getParties(): Party[] {
    return this.parties
  }

  public saveParty(partyToSave: Party): void {
    const index = this.parties.findIndex((p) => p.id === partyToSave.id)
    if (index === -1) {
      this.parties.push(partyToSave)
    } else {
      this.parties[index] = partyToSave
    }
  }
}

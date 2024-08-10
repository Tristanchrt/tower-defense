import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { Party } from '@/party/domain/Party'

export class RestPartiesRepository implements PartiesRepository {
  private parties: Record<string, Party> = {}

  public getParties(): Party[] {
    return Object.values(this.parties)
  }

  public saveParty(partyToSave: Party): void {
    this.parties[partyToSave.id] = partyToSave
  }

  public getPartyById(id: string): Party {
    return this.parties[id]
  }
}

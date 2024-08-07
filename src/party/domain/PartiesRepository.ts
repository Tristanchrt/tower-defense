import type { Party } from '@/party/domain/Party'
import type { PartyCreated } from '@/party/domain/PartyCreated'

export interface PartiesRepository {
  getParty(): Party
  saveParty(party: PartyCreated): void
}

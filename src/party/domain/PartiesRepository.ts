import type { Party } from '@/party/domain/Party'
import type { PartyCreated } from '@/party/domain/PartyCreated'

export interface PartiesRepository {
  getParties(): Party[]
  saveParty(party: PartyCreated): void
}
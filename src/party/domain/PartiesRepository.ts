import type { Party } from '@/party/domain/Party'

export interface PartiesRepository {
  getParties(): Party[]
  saveParty(party: Party): void
}

import { describe, expect, test } from 'vitest'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'

describe('RestPartiesRepository', () => {
  const rest = new RestPartiesRepository()

  test('Should create party', () => {
    rest.saveParty(PartyFixture.partyCreated())
    expect(rest.getParties()[0]).toStrictEqual(PartyFixture.partyCreated())
  })
  test('Should update party', () => {
    const party = PartyFixture.partyCreated()
    rest.saveParty(party)
    rest.saveParty(party)
    expect(rest.getParties()[0]).toStrictEqual(party)
  })
})

import { describe, expect, test } from 'vitest'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'

describe('RestPartiesRepository', () => {
  const rest = new RestPartiesRepository()

  test('Should create party', () => {
    rest.saveParty(PartyFixture.partyCreated())
    expect(rest.getParties()[0]).toStrictEqual(PartyFixture.partyCreated())
    expect(rest.getParties().length).toEqual(1)
  })
  test('Should update party', () => {
    const party = PartyFixture.partyCreated()
    rest.saveParty(party)
    rest.saveParty(party)
    expect(rest.getParties()[0]).toStrictEqual(party)
    expect(rest.getParties().length).toEqual(1)
  })

  test('Should get party by id', () => {
    const partyCreated = PartyFixture.partyCreated()
    rest.saveParty(partyCreated)
    const party = rest.getPartyById(partyCreated.id)
    expect(party).toEqual(partyCreated)
  })

})

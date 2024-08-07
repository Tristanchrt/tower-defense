import {describe, expect, test } from 'vitest'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'


describe('RestPartiesRepository', () => {

  test('Should create party', () => {
    const rest = new RestPartiesRepository()
    rest.saveParty(PartyFixture.partyCreated())
    expect(rest.getParty()).toStrictEqual(PartyFixture.partyCreated())
  })

})
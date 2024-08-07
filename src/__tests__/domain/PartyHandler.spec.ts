import { PartyHandler } from '@/party/domain/PartyHandler';
import {describe, expect, test, vi } from 'vitest'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'

describe('Party Handler', () => {

  test('Should create party when calling creator', () => {

    const mockPartiesRepository = {
      saveParty: vi.fn()
    };
    const partyHandler = new PartyHandler(mockPartiesRepository as unknown as PartiesRepository);

    const createdParty = partyHandler.createParty(PartyFixture.partyToCreate());

    expect(mockPartiesRepository.saveParty).toHaveBeenCalledWith(createdParty);
    expect(createdParty).toEqual(PartyFixture.partyCreated());
  })

})
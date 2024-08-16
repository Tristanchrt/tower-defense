import { describe, expect, test, vi } from 'vitest'
import { MonsterGenerator } from '@/party/domain/MonsterGenerator'
import { PartyFixture } from '@/__tests__/domain/PartyFixture'

describe('Monster generator', () => {
  test('Should generate monster ', () => {
    const party = PartyFixture.partyMonstersToPlayRoundTwo()
    const monsterGenerator = new MonsterGenerator(party.getHeightBoard(), () => 10)
    const monster = monsterGenerator.generate()
    expect(monster.y).toBeLessThanOrEqual(party.getHeightBoard())
  })
})

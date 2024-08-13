import { PartyFixture } from './PartyFixture'
import { describe, expect, test, vi } from 'vitest'
import { Monster } from '@/party/domain/Monster'

describe('Party', () => {
  test('Should init Party object', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    expect(partyPlayersToPlay.getBoard()).toStrictEqual(PartyFixture.board())
  })

  test('Should PartyCreated change to PartyPlayersToPlay.vue', () => {
    const partyCreated = PartyFixture.partyCreated()
    const partyPlayersToPlay = partyCreated.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundOne())
  })

  test('Should PartyPlayersToPlay change to PartyMonsterToPlay', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const partyMonstersToPlay = partyPlayersToPlay.toMonsterToPlay()
    expect(partyMonstersToPlay).toStrictEqual(PartyFixture.partyMonstersToPlayRoundTwo())
  })

  test('Should PartyMonsterToPlay change to PartyPlayersToPlay.vue', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    const partyPlayersToPlay = partyMonstersToPlay.toPlayersToPlay()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwo())
  })

  test('Should throw an error when x or y are not in the matrix area for a tower', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const tower = PartyFixture.towerToAddPlayer1(100, 100)
    expect(() => partyPlayersToPlay.addTower(tower)).toThrowError('Not in the matrix area')
  })

  test('Should add tower when player 1 is playing', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    const tower = PartyFixture.towerToAddPlayer1(1, 1)
    partyPlayersToPlay.addTower(tower)
    expect(partyPlayersToPlay.getTowers()[0]).toStrictEqual(tower)
  })

  test('Should PartyMonsterToPlay play', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    const partyPlayersToPlay = partyMonstersToPlay.play()
    expect(partyPlayersToPlay).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwo())
  })

  test('Should run a wave for PartyMonsterToPlay and create a monster', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    partyMonstersToPlay.waveMonster()
    const monster = PartyFixture.monsterOne(0, 4)
    expect(partyMonstersToPlay.getMonsters()[0].x).toEqual(monster.x)
    expect(monster.y).toBeLessThanOrEqual(partyMonstersToPlay.getBoard().getHeight())
    expect(monster.y).toBeGreaterThanOrEqual(0)
  })

  test('Should run a wave for PartyMonsterToPlay and move monster to the next x', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwo()
    const monster = PartyFixture.monsterOne(0, 4)
    vi.spyOn(partyMonstersToPlay, 'generateMonsters').mockReturnValue(monster);
    partyMonstersToPlay.waveMonster()
    partyMonstersToPlay.waveMonster()
    expect(monster.x).toEqual(1)
  })

  test('Should display Tower in the board for a PartyPlayersToPlay', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    partyPlayersToPlay.addTower(PartyFixture.towerToAddPlayer1(0,0))
    const board = partyPlayersToPlay.display()
    expect(board.getMatrix()[0][0]).toStrictEqual(PartyFixture.towerToAddPlayer1(0,0))
  })

  test('Should display Tower and Monster in the board for a PartyMonsterToPlay', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTower()
    partyMonstersToPlay.waveMonster()
    const board = partyMonstersToPlay.display()
    expect(board.getMatrix()[0][0]).toStrictEqual(PartyFixture.towerToAddPlayer1(0,0))
  })

  test('Should tower searching for monster and kill it', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTower()

    vi.spyOn(partyMonstersToPlay, 'generateMonsters').mockReturnValue(new Monster(1,1));

    partyMonstersToPlay.waveMonster()
    partyMonstersToPlay.waveTowers()
    expect(partyMonstersToPlay.getMonsters().length).toEqual(0)
  })

  test('Should tower searching for monster and find nothing', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTower()

    vi.spyOn(partyMonstersToPlay, 'generateMonsters').mockReturnValue(new Monster(2,2));

    partyMonstersToPlay.waveMonster()
    partyMonstersToPlay.waveTowers()
    expect(partyMonstersToPlay.getMonsters().length).toEqual(1)
  })

})

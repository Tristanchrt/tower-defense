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

  test('Should display Tower in the board for a PartyPlayersToPlay', () => {
    const partyPlayersToPlay = PartyFixture.partyPlayersToPlayRoundOne()
    partyPlayersToPlay.addTower(PartyFixture.towerToAddPlayer1(0, 0))
    const board = partyPlayersToPlay.display()
    expect(board.getMatrix()[0][0]).toStrictEqual(PartyFixture.towerToAddPlayer1(0, 0))
  })

  test('Should tower searching for monsters and kill some', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTowers()
    vi.spyOn(partyMonstersToPlay, 'generateMonster').mockReturnValue(new Monster(1, 1))

    partyMonstersToPlay.wavePlay()
    expect(partyMonstersToPlay.getTowers()[0].getMunitions()).toEqual(0)
    expect(partyMonstersToPlay.getTowers()[1].getMunitions()).toEqual(2)
    expect(partyMonstersToPlay.getMonsters().length).toEqual(2)
  })

  test('Should party play with a complete wave with monsters and towers and return a PartyPlayersToPlay', () => {
    const partyMonstersToPlay = PartyFixture.partyMonstersToPlayRoundTwoWithTowers()
    vi.spyOn(partyMonstersToPlay, 'generateMonster').mockReturnValue(new Monster(1, 1))
    const party = partyMonstersToPlay.play()
    expect(party).toStrictEqual(PartyFixture.partyPlayersToPlayRoundTwoWithTowers())
  })
})

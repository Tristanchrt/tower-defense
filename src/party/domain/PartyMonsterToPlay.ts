import { type Board } from './Board'
import type { PartyPlay } from './Party'
import { PartyPlayersToPlay } from './PartyPlayersToPlay'
import { type Player } from './Player'
import { Monster } from '@/party/domain/Monster'
import type { Tower } from '@/party/domain/Tower'
import { MonsterGenerator } from '@/party/domain/MonsterGenerator'
import { EventParty } from '@/party/domain/EventParty'
import type { PartyEvents } from '@/party/domain/PartyEvents'

export class PartyMonstersToPlay implements PartyPlay {
  id: string
  wave: number = 10
  monsters: Monster[] = []
  constructor(
    id: string,
    private readonly board: Board,
    private readonly players: Player[],
    private towers: Tower[],
    private readonly round: number,
    private monsterGenerator: MonsterGenerator,
    private partyEvents: PartyEvents
  ) {
    this.id = id
    this.board = board
    this.players = players
    this.towers = towers
    this.round = round
    this.monsterGenerator = monsterGenerator
    this.partyEvents = partyEvents
  }

  display(): Board {
    return this.board.display([...this.towers, ...this.monsters])
  }

  getRound(): number {
    return this.round
  }

  getBoard(): Board {
    return this.board
  }

  getHeightBoard(): number {
    return this.board.getHeight()
  }

  getPlayers(): Player[] {
    return this.players
  }

  getTowers(): Tower[] {
    return this.towers
  }

  toPlayersToPlay(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(this.id, this.board, this.players, this.towers, this.round)
  }

  wavePlay(): void {
    for (let pas = 0; pas < this.wave; pas++) {
      this.waveMonster()
      this.waveTowers()
      this.removeDefeatedMonsters()
    }
  }

  getEvents(): EventParty[] {
    return this.partyEvents.getEvents()
  }

  displayEvents(): void {
    const events = this.partyEvents.getEvents()
    events.forEach((event) => console.log(event.action))
  }

  private waveMonster(): void {
    this.monsters.forEach((monster: Monster) => {
      const oldX = monster.x
      const oldY = monster.y
      monster.moveTo()
      this.partyEvents.saveEvent(
        new EventParty(
          `Monster ${monster.id} moved from (${oldX}, ${oldY}) to (${monster.x}, ${monster.y})`,
          monster,
          this.round
        )
      )
    })
    const newMonster = this.monsterGenerator.generate()
    this.monsters.push(newMonster)
    this.partyEvents.saveEvent(
      new EventParty(
        `Monster ${newMonster.id} created to (${newMonster.x}, ${newMonster.y})`,
        newMonster,
        this.round
      )
    )
  }

  private waveTowers(): void {
    this.towers.forEach((tower: Tower) => {
      if (this.isMonstersAlive()) {
        this.partyEvents.saveEvent(
          new EventParty(
            `Tower ${tower.id} at (${tower.x}, ${tower.y}) ${tower.getMunitions()} waiting to shot`,
            tower,
            this.round
          )
        )
        tower.attack(this.monsters)
      }
    })
  }

  private removeDefeatedMonsters(): void {
    this.monsters = this.monsters.filter((monster) => monster.isAlive())
  }

  private isMonstersAlive(): boolean {
    return this.monsters.length > 0
  }
}

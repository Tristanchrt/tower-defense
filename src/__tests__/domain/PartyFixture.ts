import { Board } from '@/party/domain/Board'
import { PartyCreated } from '@/party/domain/PartyCreated'
import { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { Player } from '@/party/domain/Player'
import { Tower } from '@/party/domain/Tower'
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import { PartyEvents } from '@/party/domain/PartyEvents'
import { MonsterGenerator } from '@/party/domain/MonsterGenerator'

export class PartyFixture {
  static board(): Board {
    return new Board(10, 10)
  }

  private static idParty(): string {
    return 'Q6ldn6uAS6EB'
  }

  public static partyPlayersToPlayRoundOne(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [],
      1
    )
  }

  public static partyMonstersToPlayRoundTwo(): PartyMonstersToPlay {
    return new PartyMonstersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [],
      2,
      this.monsterGenerator(),
      this.partyEvents()
    )
  }

  public static partyMonstersToPlayRoundTwoWithTower(): PartyMonstersToPlay {
    return new PartyMonstersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [PartyFixture.towerToAddPlayer1(0, 0)],
      2,
      this.monsterGenerator(),
      this.partyEvents()
    )
  }

  public static partyMonstersToPlayRoundTwoWithTowers(): PartyMonstersToPlay {
    return new PartyMonstersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [PartyFixture.towerToAddPlayer1(0, 0), PartyFixture.towerToAddPlayer2(3, 0)],
      2,
      this.monsterGenerator(),
      this.partyEvents()
    )
  }

  public static partyPlayersToPlayRoundTwo(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [],
      2
    )
  }

  public static partyPlayersToPlayRoundTwoWithTowers(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      [
        new Tower(this.towerUUIDOne(), 0, 0, 0, this.player1()),
        new Tower(this.towerUUIDTwo(), 3, 0, 2, this.player2())
      ],
      2
    )
  }

  public static partyCreated(): PartyCreated {
    return new PartyCreated(this.idParty(), PartyFixture.board(), [this.player1(), this.player2()])
  }

  public static player1(): Player {
    return new Player('player1')
  }

  public static player2(): Player {
    return new Player('player2')
  }

  public static towerToAddPlayer1(x: number, y: number): Tower {
    return new Tower(this.towerUUIDOne(), x, y, 5, this.player1())
  }

  public static towerToAddPlayer2(x: number, y: number): Tower {
    return new Tower(this.towerUUIDTwo(), x, y, 5, this.player2())
  }

  public static partyToCreate() {
    return new PartyToCreate(this.idParty(), this.board(), [this.player1(), this.player2()])
  }

  public static partyEvents() {
    return new PartyEvents()
  }

  public static monsterGenerator() {
    return new MonsterGenerator(10, (max) => 1)
  }

  public static towerUUIDOne() {
    return 'ID1'
  }

  public static towerUUIDTwo() {
    return 'ID1'
  }
}

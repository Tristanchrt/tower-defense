import { Board } from '@/party/domain/Board'
import { PartyCreated } from '@/party/domain/PartyCreated'
import { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'
import { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import { Player } from '@/party/domain/Player'
import { Tower } from '@/party/domain/Tower'
import { PartyToCreate } from '@/party/domain/PartyToCreate'
import { Monster } from '@/party/domain/Monster'

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
      1
    )
  }

  public static partyMonstersToPlayRoundTwo(): PartyMonstersToPlay {
    return new PartyMonstersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      2
    )
  }

  public static partyPlayersToPlayRoundTwo(): PartyPlayersToPlay {
    return new PartyPlayersToPlay(
      this.idParty(),
      PartyFixture.board(),
      [this.player1(), this.player2()],
      2
    )
  }

  public static partyCreated(): PartyCreated {
    return new PartyCreated(this.idParty(), PartyFixture.board(), [this.player1(), this.player2()])
  }

  public static player1(): Player {
    return new Player('player1')
  }

  public static monsterOne(x: number, y: number): Monster {
    return new Monster(x, y)
  }

  public static player2(): Player {
    return new Player('player2')
  }

  public static towerToAddPlayer1(x: number, y: number): Tower {
    return new Tower(x, y, 10, this.player1())
  }

  public static partyToCreate() {
    return new PartyToCreate(this.idParty(), this.board(), [this.player1(), this.player2()])
  }
}

import type { Board } from '@/party/domain/Board'
import type { Player } from '@/party/domain/Player'
import { PartyCreated } from '@/party/domain/PartyCreated'

export class PartyToCreate {
  private readonly id: string
  private readonly board: Board
  private readonly players: Player[]

  constructor(id: string, board: Board, players: Player[]) {
    this.id = id
    this.board = board
    this.players = players
  }

  // private generateRandomString(length: number): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  public create() {
    return new PartyCreated(this.id, this.board, this.players)
  }
}

import type { Board } from './Board'
import type { Player } from './Player'
import type { Tower } from '@/party/domain/Tower'

export interface Party {
  id: string
  getBoard(): Board
  getPlayers(): Player[]
}

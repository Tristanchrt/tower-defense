import type { Board } from "./Board";
import type { Player } from "./Player";

export interface Party {
    id: string
    getBoard(): Board;
    getPlayers(): Player[];
}
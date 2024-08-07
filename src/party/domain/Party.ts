import type { Board } from "./Board";
import type { Player } from "./Player";

export interface Party {
    getBoard(): Board;
    getPlayers(): Player[];
}
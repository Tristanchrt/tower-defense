import { Monster } from '@/party/domain/Monster'

export class MonsterGenerator {
  yMax: number
  constructor(yMax: number) {
    this.yMax = yMax
  }

  generate(): Monster {
    return new Monster(0, this.randomY());
  }

  private randomY(): number {
    return Math.floor(Math.random() * this.yMax);
  }

}
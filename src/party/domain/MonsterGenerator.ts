import { Monster } from '@/party/domain/Monster'

export class MonsterGenerator {
  constructor(
    private readonly yMax: number,
    private readonly randomFunc: (max: number) => number
  ) {}

  generate(): Monster {
    const y = this.randomFunc(this.yMax)
    return new Monster(0, y)
  }
}

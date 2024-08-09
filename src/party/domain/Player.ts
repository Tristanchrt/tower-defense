export class Player {
  constructor(private readonly name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }
}

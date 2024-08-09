export class Player {
  constructor(private name: string) {
    this.name = name
  }

  public getName(): string {
    return this.name
  }
}

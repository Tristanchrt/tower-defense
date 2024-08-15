export class Player {
  constructor(private readonly name: string) {
    this.name = name
  }

  getName(): string {
    return this.name
  }
}

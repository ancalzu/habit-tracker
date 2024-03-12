import { InvalidNameError } from './invalid-name.error'

export class Name {
  public readonly valueName: string
  constructor(readonly value: string) {
    this.valueName = value
  }

  static create(value: string): Name {
    if (value.length < 3 || value.length > 50) {
      throw InvalidNameError.withInvalidValue(value)
    }
    return new Name(value)
  }

  equals(name: Name): boolean {
    return name.value === this.value
  }
}

import { BaseError } from '../../error'

export class InvalidDateError extends BaseError {
  private constructor(message: string) {
    super('invalid-date', message)
  }

  static create(): InvalidDateError {
    return new InvalidDateError(
      `Date needs to be equal to or before to the current date.`,
    )
  }
}

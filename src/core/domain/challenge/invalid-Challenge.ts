import { BaseError } from '../../error'

export class InvalidChallenge extends BaseError {
  private constructor(message: string) {
    super('invalid-challenge-pending', message)
  }

  static create(): InvalidChallenge {
    return new InvalidChallenge(
      'Can not generate an achievement on this challenge',
    )
  }
}

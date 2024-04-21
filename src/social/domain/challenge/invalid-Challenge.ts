import { BaseError } from '../../error'

export class InvalidChallenge extends BaseError {
  private constructor(message: string) {
    super('invalid-challenge-pending', message)
  }

  static withId(id: string): InvalidChallenge {
    return new InvalidChallenge(
      'Can not found this challenge with this id: ' + id,
    )
  }
}

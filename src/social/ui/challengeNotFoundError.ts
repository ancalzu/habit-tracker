import { BaseError } from '../core/error'

export class ChallengeNotFoundError extends BaseError {
  private constructor(message: string) {
    super('challenge-not-found', message)
  }

  static withId(id: string): ChallengeNotFoundError {
    return new ChallengeNotFoundError(
      `Challenge with id ${id} not found. You need to create a challenge`,
    )
  }
}

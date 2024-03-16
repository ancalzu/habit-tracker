import { BaseError } from '../../error'

export class MissingChallengeError extends BaseError {
  private constructor(message: string) {
    super('duplicated-habit-name', message)
  }

  static withId(withId: string): MissingChallengeError {
    return new MissingChallengeError(`Challenge with ${withId} does not exist`)
  }
}

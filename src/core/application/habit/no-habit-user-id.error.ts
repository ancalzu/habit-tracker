import { BaseError } from '../../error'

export class NoHabitUserError extends BaseError {
  private constructor(message: string) {
    super('duplicated-habit-name', message)
  }

  static withUserId(userId: string): NoHabitUserError {
    return new NoHabitUserError(`No habit for ${userId} already exists`)
  }
}

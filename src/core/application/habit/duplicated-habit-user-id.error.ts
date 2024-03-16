import { BaseError } from '../../error'

export class DuplicatedHabitUserError extends BaseError {
  private constructor(message: string) {
    super('duplicated-habit-name', message)
  }

  static withUserId(name: string, userId: string): DuplicatedHabitUserError {
    return new DuplicatedHabitUserError(
      `Habit with name ${name} for ${userId} already exists`,
    )
  }
}

import { BaseError } from '../../error'

export class UnfeasibleHabitError extends BaseError {
  private constructor(message: string) {
    super('Unfeasible-Habit-Error', message)
  }

  static withValue(value: string): UnfeasibleHabitError {
    return new UnfeasibleHabitError(
      `Habit with property ${value} is not feasible`,
    )
  }
}

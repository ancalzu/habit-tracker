import { BaseError } from '../../error'

export class MissingHabitProperty extends BaseError {
  private constructor(message: string) {
    super('Missing-Habit-Property', message)
  }

  static withValue(name: string): MissingHabitProperty {
    return new MissingHabitProperty(`Property with name ${name} is missing`)
  }
}

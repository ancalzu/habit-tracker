import { v4 as uuidv4 } from 'uuid'

export class Challenge {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly description: string,
    readonly iterations: string,
    readonly startDate: Date,
    readonly limitDate: Date,
  ) {}

  static create(
    habitId: string,
    description: string,
    iterations: string,
    startDate: Date,
    limitDate: Date,
  ): Challenge {
    const id = uuidv4()
    const ProgressHabitId = habitId
    const challengeDescription = description
    const challengeiterations = iterations
    const challengestartDate = startDate
    const challengelimitDate = limitDate

    return new Challenge(
      id,
      ProgressHabitId,
      challengeDescription,
      challengeiterations,
      challengestartDate,
      challengelimitDate,
    )
  }
}

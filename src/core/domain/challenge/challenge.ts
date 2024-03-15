import { v4 as uuidv4 } from 'uuid'

export class Challenge {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly description: string,
    readonly iterations: string,
    readonly startDate: Date,
    readonly limitDate: Date,
    readonly status: string,
    readonly currentIterations: number,
  ) {}

  static create(
    habitId: string,
    description: string,
    iterations: string,
    startDate: Date,
    limitDate: Date,
    status: string,
    currentIterations: number,
  ): Challenge {
    const id = uuidv4()
    const ProgressHabitId = habitId
    const challengeDescription = description
    const challengeiterations = iterations
    const challengestartDate = startDate
    const challengelimitDate = limitDate
    const challengeStatus = status
    const challengecurrentIterations = currentIterations

    return new Challenge(
      id,
      ProgressHabitId,
      challengeDescription,
      challengeiterations,
      challengestartDate,
      challengelimitDate,
      challengeStatus,
      challengecurrentIterations,
    )
  }

  static completeChallenge(challenge: Challenge) {
    if (challenge.status === 'complete' || challenge.status === 'suspended') {
      return challenge.status
    }
  }
}

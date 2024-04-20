import { AggregateRoot } from '../aggregateRoot'
import { InvalidChallenge } from './invalid-Challenge'
import { ChallengeId } from './challengeId'
import { GoalId } from '../goal/goalId'
import { GoalWasCreatedEvent } from '../goal/goalWasCreatedEvent'
import { Goal } from '../goal/Goal'
export type ChallengeState = 'Pending' | 'Completed' | 'Suspended' | 'Canceled'

export class Challenge extends AggregateRoot {
  readonly id: ChallengeId
  readonly habitId: string
  readonly description: string
  readonly iterations: number
  readonly startDate: Date
  readonly limitDate: Date
  public status: string
  readonly currentIterations: number

  constructor(
    id: ChallengeId,
    habitId: string,
    description: string,
    iterations: number,
    startDate: Date,
    limitDate: Date,
    status: string,
    currentIterations: number,
  ) {
    super()
    this.id = id
    this.habitId = habitId
    this.description = description
    this.iterations = iterations
    this.startDate = startDate
    this.limitDate = limitDate
    this.status = status
    this.currentIterations = currentIterations
  }

  static create(
    id: string,
    habitId: string,
    description: string,
    iterations: number,
    startDate: Date,
    limitDate: Date,
    status: string,
    currentIterations: number,
  ): Challenge {
    const challengeId = ChallengeId.create(id)

    return new Challenge(
      challengeId,
      habitId,
      description,
      iterations,
      startDate,
      limitDate,
      status,
      currentIterations,
    )
  }

  isPending(): boolean {
    return this.status === 'Pending'
  }

  hasReachedTheGoal(progress: number, date: Date) {
    return (
      this.iterations <= progress && this.limitDate.getTime() <= date.getTime()
    )
  }

  completeChallenge(challenge: Challenge) {
    if (challenge.status === 'complete' || challenge.status === 'suspended') {
      this.status = 'Canceled'
      return this
    }
  }

  suspendChallenge() {
    this.status = 'Suspended'
    return this
  }

  generateGoal(
    goalId: GoalId,
    userId: string,
    progress: number,
    date: Date,
    challengeId: ChallengeId,
  ): void {
    if (!this.isPending()) {
      throw InvalidChallenge.create()
    }

    if (this.hasReachedTheGoal(progress, date)) {
      console.log(`Challenge Completed: ${challengeId}`)
      const goal = Goal.create(goalId, this.id.value, userId, date)
      this.recordEvent(GoalWasCreatedEvent.fromGoal(goal))
    }
  }
}

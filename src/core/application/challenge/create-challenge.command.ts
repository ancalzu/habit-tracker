import { ChallengeId } from 'src/core/domain/challenge/challengeId'

export class CreateChallengeCommand {
  id: ChallengeId
  habitId: string
  description: string
  iterations: number
  startDate: Date
  limitDate: Date
  status: string
  currentIterations: number

  constructor(
    id: ChallengeId,
    habitId: string,
    description: string,
    iterations: number,
    startDate: Date,
    limitDate: Date,
    ChallengeStatus: string,
    currentIterations: number,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = description
    this.iterations = iterations
    this.startDate = startDate
    this.limitDate = limitDate
    this.status = ChallengeStatus
    this.currentIterations = currentIterations
  }
}

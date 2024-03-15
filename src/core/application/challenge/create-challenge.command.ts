export class CreateChallengeCommand {
  id: string
  habitId: string
  description: string
  iterations: string
  startDate: Date
  limitDate: Date
  status: string
  currentIterations: number

  constructor(
    id: string,
    habitId: string,
    description: string,
    iterations: string,
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

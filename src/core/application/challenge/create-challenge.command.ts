export class CreateChallengeCommand {
  id: string
  habitId: string
  description: string
  iterations: string
  startDate: Date
  limitDate: Date

  constructor(
    id: string,
    habitId: string,
    description: string,
    iterations: string,
    startDate: Date,
    limitDate: Date,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = description
    this.iterations = iterations
    this.startDate = startDate
    this.limitDate = limitDate
  }
}

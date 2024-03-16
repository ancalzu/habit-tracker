export class CreateGoalCommand {
  id: string
  challengeId: string
  userId: string
  completeDate: Date

  constructor(
    id: string,
    challengeId: string,
    userId: string,
    completeDate: Date,
  ) {
    this.id = id
    this.challengeId = challengeId
    this.userId = userId
    this.completeDate = completeDate
  }
}

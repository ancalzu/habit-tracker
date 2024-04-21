import { GoalId } from 'src/core/domain/goal/goalId'

export class CreateGoalCommand {
  id: GoalId
  challengeId: string
  userId: string
  completeDate: Date

  constructor(challengeId: string, userId: string, completeDate: Date) {
    const goalId = GoalId.generateId()
    this.id = goalId
    this.challengeId = challengeId
    this.userId = userId
    this.completeDate = completeDate
  }
}

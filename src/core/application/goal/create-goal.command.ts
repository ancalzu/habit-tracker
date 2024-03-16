import { v4 as uuidv4 } from 'uuid'

export class CreateGoalCommand {
  id: string
  challengeId: string
  userId: string
  completeDate: Date

  constructor(challengeId: string, userId: string, completeDate: Date) {
    this.id = uuidv4()
    this.challengeId = challengeId
    this.userId = userId
    this.completeDate = completeDate
  }
}

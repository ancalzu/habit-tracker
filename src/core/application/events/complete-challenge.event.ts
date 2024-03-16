import { v4 as uuidv4 } from 'uuid'
export class ChallengeCompletedEvent {
  id: string
  challengeId: string
  userId: string
  dateAchieved: Date

  constructor(challengeId: string, userId: string, dateAchieved: Date) {
    this.id = uuidv4()
    this.challengeId = challengeId
    this.userId = userId
    this.dateAchieved = dateAchieved
  }
}

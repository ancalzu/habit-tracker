import { v4 as uuidv4 } from 'uuid'
export class ChallengeCompletedEvent {
  id: string
  userId: string
  challengeId: string
  progress: number
  dateAchieved: Date

  constructor(
    progress: number,
    userId: string,
    dateAchieved: Date,
    challengeId: string,
  ) {
    this.id = uuidv4()
    this.progress = progress
    this.userId = userId
    this.dateAchieved = dateAchieved
    this.challengeId = challengeId
  }
}

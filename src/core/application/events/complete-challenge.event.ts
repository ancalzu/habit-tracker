export class ChallengeCompletedEvent {
  id: string
  challengeId: string
  userId: string
  dateAchieved: Date

  constructor(
    id: string,
    challengeId: string,
    userId: string,
    dateAchieved: Date,
  ) {
    this.id = id
    this.challengeId = challengeId
    this.userId = userId
    this.dateAchieved = dateAchieved
  }
}

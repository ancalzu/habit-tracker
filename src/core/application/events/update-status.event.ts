export class UpdateStatusEvent {
  challengeId: string

  constructor(challengeId: string) {
    this.challengeId = challengeId
  }
}

import { ChallengeId } from 'src/core/domain/challenge/challengeId'

export class UpdateStatusEvent {
  challengeId: ChallengeId

  constructor(challengeId: ChallengeId) {
    this.challengeId = challengeId
  }
}

import { Id } from '../../id'

export class ChallengeId extends Id {
  static create(id: string): ChallengeId {
    return new ChallengeId(id)
  }

  static empty(): ChallengeId {
    return new ChallengeId('')
  }
}

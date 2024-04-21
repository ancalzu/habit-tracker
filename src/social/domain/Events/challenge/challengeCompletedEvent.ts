import { DomainEvent } from '../domainEvent'
import { ChallengeId } from './challenge.Id'

export type ChallengeCompletedPayload = {
  readonly challengeId: string
  readonly userId: string
}

export class ChallengeCompletedEvent extends DomainEvent<ChallengeCompletedPayload> {
  static readonly Type = 'ProgressCompleted'

  private constructor(
    challengeId: ChallengeId,
    payload: ChallengeCompletedPayload,
  ) {
    super(challengeId, ChallengeCompletedEvent.Type, payload)
  }

  static with(
    challengeId: ChallengeId,
    userId: string,
  ): ChallengeCompletedEvent {
    return new ChallengeCompletedEvent(challengeId, {
      challengeId: challengeId.value,
      userId,
    })
  }
}

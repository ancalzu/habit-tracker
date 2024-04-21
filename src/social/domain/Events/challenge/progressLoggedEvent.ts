import { DomainEvent } from '../domainEvent'
import { ChallengeId } from './challenge.Id'

export type ProgressLoggedPayload = {
  readonly challengeId: string
  readonly userId: string
  readonly progress: number
}

export class ProgressLoggedEvent extends DomainEvent<ProgressLoggedPayload> {
  static readonly Type = 'ProgressLogged'

  private constructor(
    challengeId: ChallengeId,
    payload: ProgressLoggedPayload,
  ) {
    super(challengeId, ProgressLoggedEvent.Type, payload)
  }

  static with(
    challengeId: ChallengeId,
    userId: string,
    progress: number,
  ): ProgressLoggedEvent {
    return new ProgressLoggedEvent(challengeId, {
      challengeId: challengeId.value,
      userId,
      progress,
    })
  }
}

import { DomainEvent } from '../../../core/domain/domainEvent'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { HabitId } from '../../../core/domain/habit/habitId'

export type ChallengeStartedPayload = {
  readonly challengeId: string
  readonly habitId: string
  readonly target: number
  readonly partner: string
  readonly project: string
  readonly cost: number
  readonly deadline: Date
  readonly users: string[]
}

export class ChallengeStartedEvent extends DomainEvent<ChallengeStartedPayload> {
  static readonly Type = 'ChallengeStarted'

  private constructor(id: ChallengeId, payload: ChallengeStartedPayload) {
    super(id, ChallengeStartedEvent.Type, payload)
  }

  static with(
    challengeId: ChallengeId,
    habitId: HabitId,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    users: string[],
  ): ChallengeStartedEvent {
    return new ChallengeStartedEvent(challengeId, {
      challengeId: challengeId.value,
      habitId: habitId.value,
      target,
      partner,
      project,
      cost,
      deadline,
      users,
    })
  }
}

import { DomainEvent } from '../../../core/domain/domainEvent'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'

export type UsersAddedPayload = {
  readonly users: string[]
}

export class UsersAddedEvent extends DomainEvent<UsersAddedPayload> {
  static readonly Type = 'UsersAdded'

  private constructor(id: ChallengeId, payload: UsersAddedPayload) {
    super(id, UsersAddedEvent.Type, payload)
  }

  static with(challengeId: ChallengeId, users: string[]): UsersAddedEvent {
    return new UsersAddedEvent(challengeId, {
      users,
    })
  }
}

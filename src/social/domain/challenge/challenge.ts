import { EventSourcedEntity } from '../eventSourcedEntity'
import { DomainEvent } from '../../../core/domain/domainEvent'
import { ChallengeState } from './challengeState'
import { ChallengeStartedEvent } from '../Events/challenge/challengeStartedEvent'
import { HabitId } from '../../../core/domain/habit/habitId'
import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { UsersAddedEvent } from '../Events/challenge/usersAddedEvent'

export class Challenge extends EventSourcedEntity {
  private challengeState: ChallengeState

  private constructor(stream: Array<DomainEvent> = []) {
    super(stream)
    if (stream.length === 0) {
      this.challengeState = ChallengeState.empty()
    }
  }

  protected when(e: DomainEvent): void {
    switch (e.type) {
      case ChallengeStartedEvent.Type:
        this.whenChallengeStarted(e as unknown as ChallengeStartedEvent)
        break
      case UsersAddedEvent.Type:
        this.whenUsersAdded(e as unknown as UsersAddedEvent)
        break
      default:
        throw new Error('Unknown event type')
    }
  }

  private whenChallengeStarted(event: ChallengeStartedEvent) {
    this.challengeState = this.challengeState.withChallengeStarted(event)
  }

  private whenUsersAdded(event: UsersAddedEvent) {
    this.challengeState = this.challengeState.withUsersAdded(event)
  }

  static createStarted(
    id: string,
    habitId: HabitId,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    users: string[],
  ): Challenge {
    const challengeId = ChallengeId.create(id)
    const challenge = new Challenge()

    challenge.start(
      challengeId,
      habitId,
      target,
      partner,
      project,
      cost,
      deadline,
      users,
    )
    return challenge
  }

  start(
    id: ChallengeId,
    habitId: HabitId,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    users: string[],
  ): void {
    this.apply(
      ChallengeStartedEvent.with(
        id,
        habitId,
        target,
        partner,
        project,
        cost,
        deadline,
        users,
      ),
    )
  }

  static usersAdded(stream: DomainEvent, users: string[]): Challenge {
    const challenge = new Challenge([stream])
    this.apply(UsersAddedEvent.with(stream.id, users))
    return challenge
  }
}

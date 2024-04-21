import { EventSourcedEntity } from '../eventSourcedEntity'
import { ChallengeState } from './challengeState'
import { ChallengeStartedEvent } from './challengeStartedEvent'
import { UsersAddedEvent } from './usersAddedEvent'
import { ProgressLoggedEvent } from './progressLoggedEvent'
import { ChallengeCompletedEvent } from './challengeCompletedEvent'
import { ChallengeId } from './challenge.Id'
import { DomainEvent } from '../domainEvent'
import { HabitId } from 'src/core/domain/habit/habit.id'

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
      case ProgressLoggedEvent.Type:
        this.whenProgressLogged(e as unknown as ProgressLoggedEvent)
        break
      case ChallengeCompletedEvent.Type:
        this.whenChallengeCompleted(e as unknown as ChallengeCompletedEvent)
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

  private whenProgressLogged(event: ProgressLoggedEvent) {
    this.challengeState = this.challengeState.withProgressLogged(event)
  }

  private whenChallengeCompleted(event: ChallengeCompletedEvent) {
    this.challengeState = this.challengeState.withChallengeCompleted(event)
  }

  private hasReachedTheGoal(): boolean {
    return this.challengeState.hasReachedTheTarget()
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

  static addProgress(
    stream: DomainEvent,
    userId: string,
    progress: number,
  ): Challenge {
    const challenge = new Challenge([stream])
    this.apply(ProgressLoggedEvent.with(stream.id, userId, progress))

    if (challenge.hasReachedTheGoal()) {
      this.apply(ChallengeCompletedEvent.with(stream.id, userId))
    }

    return challenge
  }
}

import { ChallengeStatus } from './challengeStatus'
import { ChallengeStartedEvent } from './challengeStartedEvent'
import { UsersAddedEvent } from './usersAddedEvent'
import { ProgressLoggedEvent } from './progressLoggedEvent'
import { ChallengeCompletedEvent } from './challengeCompletedEvent'
import { ChallengeId } from './challenge.Id'

export class ChallengeState {
  constructor(
    readonly id: ChallengeId,
    readonly habitId: string,
    readonly target: number,
    readonly partner: string,
    readonly project: string,
    readonly cost: number,
    readonly deadline: Date,
    readonly users: string[],
    readonly status: ChallengeStatus,
    readonly progress: number,
  ) {}

  static empty(): ChallengeState {
    return new ChallengeState(
      ChallengeId.empty(),
      '',
      0,
      '',
      '',
      0,
      new Date(),
      [],
      ChallengeStatus.empty(),
      0,
    )
  }

  withChallengeStarted(event: ChallengeStartedEvent): ChallengeState {
    return new ChallengeState(
      event.id,
      event.payload.habitId,
      event.payload.target,
      event.payload.partner,
      event.payload.project,
      event.payload.cost,
      event.payload.deadline,
      event.payload.users,
      ChallengeStatus.started(),
      0,
    )
  }

  withUsersAdded(event: UsersAddedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      event.payload.users,
      this.status,
      this.progress,
    )
  }

  withProgressLogged(event: ProgressLoggedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      [...this.users, event.payload.userId],
      this.status,
      this.progress + event.payload.progress,
    )
  }

  withChallengeCompleted(event: ChallengeCompletedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      [...this.users, event.payload.userId],
      ChallengeStatus.archieved(),
      this.progress,
    )
  }

  hasReachedTheTarget() {
    return this.target <= this.progress
  }
}

import { ChallengeId } from '../../../core/domain/challenge/challengeId'
import { HabitId } from '../../../core/domain/habit/habitId'
import { ChallengeStatus } from './challengeStatus'
import { ChallengeStartedEvent } from './challengeStartedEvent'
import { UsersAddedEvent } from './usersAddedEvent'

export class ChallengeState {
  constructor(
    readonly id: ChallengeId,
    readonly habitId: HabitId,
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
      HabitId.empty(),
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
      HabitId.create(event.payload.habitId),
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
}

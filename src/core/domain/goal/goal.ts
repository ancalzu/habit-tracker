import { GoalId } from './goalId'
export class Goal {
  constructor(
    readonly id: GoalId,
    readonly challengeId: string,
    readonly userId: string,
    readonly completeDate: Date,
  ) {}

  static create(
    id: GoalId,
    challenge: string,
    user: string,
    finishDate: Date,
  ): Goal {
    return new Goal(id, challenge, user, finishDate)
  }
}

import { Id } from '../id'

export class GoalId extends Id {
  static create(id: string): GoalId {
    return new GoalId(id)
  }
}

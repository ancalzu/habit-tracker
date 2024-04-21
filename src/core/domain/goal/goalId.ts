import { Id } from '../id'
import { v4 as uuidv4 } from 'uuid'

export class GoalId extends Id {
  static create(id: string): GoalId {
    return new GoalId(id)
  }

  static generateId(): GoalId {
    const id = uuidv4()
    return new GoalId(id)
  }
}

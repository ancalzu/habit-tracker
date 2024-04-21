import { Id } from '../id'

export class UserId extends Id {
  static create(id: string): UserId {
    return new UserId(id)
  }
}

import { Id } from '../id'

export class ReminderId extends Id {
  static create(id: string): ReminderId {
    return new ReminderId(id)
  }
}

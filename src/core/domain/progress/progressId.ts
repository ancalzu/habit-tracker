import { Id } from '../id'

export class ProgressId extends Id {
  static create(id: string): ProgressId {
    return new ProgressId(id)
  }
}

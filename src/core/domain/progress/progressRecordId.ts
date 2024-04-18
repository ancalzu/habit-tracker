import { Id } from '../id';

export class ProgressRecordId extends Id {
  static create(id: string): ProgressRecordId {
    return new ProgressRecordId(id);
  }
}

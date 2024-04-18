import { InvalidDateError } from './invalidDateError';

export class ProgressRecordDate {
  constructor(readonly value: Date) {}

  static create(date: Date): ProgressRecordDate {
    const now = new Date();
    if (date.getTime() > now.getTime()) {
      throw InvalidDateError.create(date);
    }

    return new ProgressRecordDate(date);
  }
}

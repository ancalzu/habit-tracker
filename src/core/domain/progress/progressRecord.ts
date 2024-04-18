import { ProgressRecordDate } from './progressRecordDate';
import { ProgressRecordObservation } from './progressRecordObservation';
import { ProgressRecordId } from './progressRecordId';

export class ProgressRecord {
  private constructor(
    readonly id: ProgressRecordId,
    readonly habitId: string,
    readonly date: ProgressRecordDate,
    readonly validated: boolean,
    readonly observation?: ProgressRecordObservation | string,
  ) {}

  static create(
    id: ProgressRecordId,
    habitId: string,
    date: Date,
    validated: boolean,
    observation?: string,
  ): ProgressRecord {
    const progressRecordDate = ProgressRecordDate.create(date);
    const progressRecordObservation = observation
      ? ProgressRecordObservation.create(observation)
      : '';

    return new ProgressRecord(
      id,
      habitId,
      progressRecordDate,
      validated,
      progressRecordObservation,
    );
  }
}

import { InvalidObservationError } from './invalidObservationError';

export class ProgressRecordObservation {
  constructor(readonly value: string) {}

  static create(value: string): ProgressRecordObservation {
    if (value.length < 10 || value.length > 200) {
      throw InvalidObservationError.create();
    }
    return new ProgressRecordObservation(value);
  }
}

import { DomainEvent } from '../domainEvent';
import { ProgressRecord } from './progressRecord';
import { ProgressRecordId } from './progressRecordId';

export type ProgressRecordWasCreatedPayload = {
  id: string;
  habitId: string;
  date: Date;
  validated: boolean;
  observation?: string;
};

export class ProgressRecordWasCreatedEvent extends DomainEvent<ProgressRecordWasCreatedPayload> {
  private constructor(
    id: ProgressRecordId,
    payload: ProgressRecordWasCreatedPayload,
  ) {
    super(id, ProgressRecordWasCreatedEvent.name, payload);
  }

  static fromProgressRecord(
    progressRecord: ProgressRecord,
  ): ProgressRecordWasCreatedEvent {
    return new ProgressRecordWasCreatedEvent(progressRecord.id, {
      id: progressRecord.id.value,
      habitId: progressRecord.habitId,
      date: progressRecord.date.value,
      validated: progressRecord.validated,
      observation: progressRecord.observation as string,
    });
  }
}

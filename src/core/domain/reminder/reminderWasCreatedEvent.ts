import { DomainEvent } from '../domainEvent'
import { ReminderId } from './reminderId'
import { Reminder } from './reminder'

export type ReminderWasCreatedPayload = {
  id: string
  habitId: string
  message: string
  state: string
  timestamp: Date
}

export class ReminderWasCreatedEvent extends DomainEvent<ReminderWasCreatedPayload> {
  private constructor(id: ReminderId, payload: ReminderWasCreatedPayload) {
    super(id, ReminderWasCreatedEvent.name, payload)
  }

  static fromReminder(reminder: Reminder): ReminderWasCreatedEvent {
    return new ReminderWasCreatedEvent(reminder.id, {
      ...reminder,
      id: reminder.id.value,
      timestamp: new Date(),
      state: reminder.state,
    })
  }
}

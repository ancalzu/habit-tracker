import { ReminderId } from './reminderId'
export class Reminder {
  constructor(
    readonly id: ReminderId,
    readonly habitId: string,
    readonly state: string,
    readonly message: string,
    readonly time: Date,
  ) {}

  static create(
    id: ReminderId,
    state: string,
    habit: string,
    message: string,
    time: Date,
  ): Reminder {
    return new Reminder(id, habit, state, message, time)
  }
}

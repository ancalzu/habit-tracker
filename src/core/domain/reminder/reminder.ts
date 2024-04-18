import { ReminderId } from './reminderId'
export class Reminder {
  constructor(
    readonly id: ReminderId,
    readonly habitId: string,
    readonly state: string,
    readonly message: string,
    readonly time: string,
  ) {}

  static create(
    id: ReminderId,
    state: string,
    habit: string,
    message: string,
    time: string,
  ): Reminder {
    return new Reminder(id, habit, state, message, time)
  }
}

import { v4 as uuidv4 } from 'uuid'

export class Reminder {
  constructor(
    readonly id: string,
    readonly habitId: string,
    readonly state: string,
    readonly message: string,
    readonly time: string,
  ) {}

  static create(
    state: string,
    habit: string,
    message: string,
    time: string,
  ): Reminder {
    const id = uuidv4()
    const stateReminder = state
    const habitId = habit
    const messageReminder = message
    const timeReminder = time

    return new Reminder(
      id,
      habitId,
      stateReminder,
      messageReminder,
      timeReminder,
    )
  }
}

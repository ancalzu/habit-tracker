import { ReminderId } from 'src/core/domain/reminder/reminderId'

export class AddReminderCommand {
  reminderId: ReminderId
  userId: string
  habitId: string
  message: string
  time: string

  constructor(
    reminderId: ReminderId,
    userId: string,
    habitId: string,
    message: string,
    time: string,
  ) {
    this.reminderId = reminderId
    this.userId = userId
    this.habitId = habitId
    this.message = message
    this.time = time
  }
}

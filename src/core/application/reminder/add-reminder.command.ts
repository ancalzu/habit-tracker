export class AddReminderCommand {
  userId: string
  habitId: string
  message: string
  time: string

  constructor(userId: string, habitId: string, message: string, time: string) {
    this.userId = userId
    this.habitId = habitId
    this.message = message
    this.time = time
  }
}

import { Reminder } from './reminder'

export interface ReminderRepository {
  save(reminder: Reminder): void
  countByHabitId(habitId: string): number
  findByHabitIdAndTime(habitId: string, time: string): boolean | undefined
}

export const reminderRepository = Symbol('ReminderRepository')

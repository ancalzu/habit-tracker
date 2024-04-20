import { Habit } from './habit'
import { HabitId } from './habit.id'
import { Name } from './name'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: Name): Habit | undefined
  findUniqueHabitByUser(name: Name, userId: string): Habit | undefined
  listAll(): Habit[]
  listAllbyUser(userId: string): Promise<Habit[]> | void
  findById(habitId: HabitId | string): Promise<Habit> | undefined | Habit
  updateStatus(habit: Habit): void
}

export const HabitRepository = Symbol('HabitRepository')

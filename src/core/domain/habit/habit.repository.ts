import { Habit } from './habit'
import { Name } from './name'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: Name): Habit | undefined
  findByUserById(name: Name, userId: string): Habit | undefined
  listAll(): Habit[]
}

export const HabitRepository = Symbol('HabitRepository')

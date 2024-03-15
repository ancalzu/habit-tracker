import { Habit } from './habit'
import { Name } from './name'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: Name): Habit | undefined
  findUniqueHabitByUser(name: Name, userId: string): Habit | undefined
  listAll(): Habit[]
  listAllbyUser(userId: string): Promise<Habit[]> | void
  findById(id: string): boolean
}

export const habitRepository = Symbol('HabitRepository')

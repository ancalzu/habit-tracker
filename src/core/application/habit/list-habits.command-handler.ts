import { HabitRepository } from '../../domain/habit/habit.repository'
import { CreateHabitCommand } from './create-habit.command'

export class ListHabitsCommandHandler {
  constructor(private readonly repository: HabitRepository) {}

  handle(command: CreateHabitCommand): void {
    
  }
}

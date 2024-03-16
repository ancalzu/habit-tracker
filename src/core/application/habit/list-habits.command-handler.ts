import { Inject, Injectable } from '@nestjs/common'
import { HabitRepository } from '../../domain/habit/habit.repository'
import { ListHabitByUserCommand } from './list-habits.command'
import { NoHabitUserError } from './no-habit-user-id.error'
import { Habit } from 'src/core/domain/habit/habit'
@Injectable()
export class ListHabitsCommandHandler {
  constructor(
    @Inject(HabitRepository) private readonly habitrepository: HabitRepository,
  ) {}

  async handle(command: ListHabitByUserCommand): Promise<Habit[]> {
    const hasHabits = await this.habitrepository.listAllbyUser(command.userId)
    if (!hasHabits) {
      throw NoHabitUserError.withUserId(command.userId)
    }

    return hasHabits
  }
}

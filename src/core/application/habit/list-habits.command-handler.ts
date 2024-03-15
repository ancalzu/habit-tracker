import { Inject, Injectable } from '@nestjs/common'
import {
  HabitRepository,
  habitRepository,
} from '../../domain/habit/habit.repository'
import { ListHabitByUserCommand } from './list-habits.command'
import { NoHabitUserError } from './no-habit-user-id.error'
@Injectable()
export class ListHabitsCommandHandler {
  constructor(
    @Inject(habitRepository) private readonly habitrepository: HabitRepository,
  ) {}

  handle(command: ListHabitByUserCommand): any {
    const hasHabits = this.habitrepository.listAllbyUser(command.userId)
    if (!hasHabits) {
      throw NoHabitUserError.withUserId(command.userId)
    }

    return hasHabits
  }
}

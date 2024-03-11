import { Inject, Injectable } from '@nestjs/common'
import { HabitRepository } from '../../domain/habit/habit.repository'
import { ListHabitByUserCommand } from './list-habits.command'
import { NoHabitUserError } from './no-habit-user-id.error'
@Injectable()
export class ListHabitsCommandHandler {
  constructor(
    @Inject(HabitRepository) private readonly habitrepository: HabitRepository,
  ) {}

  handle(command: ListHabitByUserCommand): void {
    if (!this.habitrepository.listAllbyUser(command.userId)) {
      throw NoHabitUserError.withUserId(command.userId)
    }

    this.habitrepository.listAllbyUser(command.userId)
  }
}

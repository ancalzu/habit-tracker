import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { CreateHabitCommand } from './create-habit.command'
import { DuplicatedHabitNameError } from './duplicated-habit-name.error'
import { Name } from '../../domain/habit/name'
import { Inject, Injectable } from '@nestjs/common'
import { DuplicatedHabitUserError } from './duplicated-habit-user-id.error'
//import { Id } from '../../domain/habit/habit.id'
@Injectable()
export class CreateHabitCommandHandler {
  constructor(
    @Inject(HabitRepository) private readonly habitrepository: HabitRepository,
  ) {}

  handle(command: CreateHabitCommand): void {
    const name = Name.create(command.name)
    if (this.habitrepository.findByName(name)) {
      throw DuplicatedHabitNameError.withName(command.name)
    }
    if (this.habitrepository.findByUserById(name, command.userId)) {
      throw DuplicatedHabitUserError.withUserId(command.name, command.userId)
    }

    const habit = Habit.create(
      command.name,
      command.frequency,
      command.duration,
      command.restTime,
      command.userId,
    )
    this.habitrepository.save(habit)
  }
}

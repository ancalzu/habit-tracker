import { HabitRepository } from '../../domain/habit/habit.repository'
import { UserRepository } from '../../domain/user/user.repository'
import { Habit } from '../../domain/habit/habit'
import { CreateHabitCommand } from './create-habit.command'
import { DuplicatedHabitNameError } from './duplicated-habit-name.error'
import { Name } from '../../domain/habit/name'

export class CreateHabitCommandHandler {
  constructor(
    private readonly repository: HabitRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(command: CreateHabitCommand): void {
    const name = Name.create(command.name)

    if (this.repository.findByName(name)) {
      throw DuplicatedHabitNameError.withName(command.name)
    }

    this.repository.save(
      Habit.create(
        command.id,
        command.name,
        command.frequency,
        command.duration,
        command.restTime,
        command.userId,
      ),
    )
  }
}

import { HabitRepository } from '../../domain/habit/habit.repository'
import { UserRepository } from '../../domain/user/userRepository'
import { UserNotFoundError } from '../user-not-found.error'
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

    if (!this.userRepository.findById(command.userId)) {
      throw UserNotFoundError.withId(command.userId)
    }

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

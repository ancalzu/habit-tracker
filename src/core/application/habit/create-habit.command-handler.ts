import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { CreateHabitCommand } from './create-habit.command'
import { DuplicatedHabitNameError } from './duplicated-habit-name.error'
import { Name } from '../../domain/habit/name'
import { DuplicatedHabitUserError } from './duplicated-habit-user-id.error'
import { MissingHabitProperty } from './missing-habit-property.error'
import { UnfeasibleHabitError } from './Unfeasible-habit.error'
import { HabitId } from 'src/core/domain/habit/habit.id'

export class CreateHabitCommandHandler {
  constructor(private readonly habitrepository: HabitRepository) {}

  handle(command: CreateHabitCommand): void {
    const name = Name.create(command.name)
    const habitId = HabitId.create(command.id)
    const values = Object.values(command)
    for (const value of values) {
      if (value === undefined || value === null || value === '') {
        throw MissingHabitProperty.withValue(value)
      }
    }
    if (this.habitrepository.findByName(name)) {
      throw DuplicatedHabitNameError.withName(command.name)
    }
    if (this.habitrepository.findUniqueHabitByUser(name, command.userId)) {
      throw DuplicatedHabitUserError.withUserId(command.name, command.userId)
    }
    if (command.frequency > 10 || command.restTime > 15) {
      const UnfeasibleValue = command.frequency > 10 ? 'frequency' : 'restTime'
      throw UnfeasibleHabitError.withValue(UnfeasibleValue)
    }

    const wearableDeviceId = undefined

    const habit = Habit.create(
      habitId,
      command.name,
      command.frequency,
      command.duration,
      command.restTime,
      command.userId,
      wearableDeviceId,
      command.status,
    )
    this.habitrepository.save(habit)
  }
}

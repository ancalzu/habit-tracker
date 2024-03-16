import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { CreateHabitCommand } from './create-habit.command'
import { DuplicatedHabitNameError } from './duplicated-habit-name.error'
import { Name } from '../../domain/habit/name'
import { Inject, Injectable } from '@nestjs/common'
import { DuplicatedHabitUserError } from './duplicated-habit-user-id.error'
import { MissingHabitProperty } from './missing-habit-property.error'
import { UnfeasibleHabitError } from './Unfeasible-habit.error'
//import { Id } from '../../domain/habit/habit.id'
@Injectable()
export class CreateHabitCommandHandler {
  constructor(
    @Inject(HabitRepository) private readonly habitrepository: HabitRepository,
  ) {}

  handle(command: CreateHabitCommand): void {
    const name = Name.create(command.name)
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
    let wearableDeviceIdHabit = command.wearableDeviceIdHabit
    if (
      !command.wearableDeviceIdHabit ||
      command.wearableDeviceIdHabit === null ||
      command.wearableDeviceIdHabit === undefined
    ) {
      wearableDeviceIdHabit = ''
    }

    if (
      !command.status ||
      command.status === null ||
      command.status === undefined
    ) {
      wearableDeviceIdHabit = 'Active'
    }

    const habit = Habit.create(
      command.name,
      command.frequency,
      command.duration,
      command.restTime,
      command.userId,
      wearableDeviceIdHabit,
      command.status,
    )
    this.habitrepository.save(habit)
  }
}

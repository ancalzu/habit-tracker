import { Inject, Injectable } from '@nestjs/common'
import {
  HabitRepository,
  habitRepository,
} from 'src/core/domain/habit/habit.repository'
import { Reminder } from 'src/core/domain/reminder/reminder'
import { AddReminderCommand } from './add-reminder.command'
import {
  ReminderRepository,
  reminderRepository,
} from 'src/core/domain/reminder/reminder.repository'

@Injectable()
export class AddReminderCommandHandler {
  constructor(
    @Inject(habitRepository)
    private readonly habitrepository: HabitRepository,
    @Inject(reminderRepository)
    private readonly reminderrepository: ReminderRepository,
  ) {}

  handle(command: AddReminderCommand): void {
    if (!this.habitrepository.findById(command.habitId)) {
      console.log('Missing habit')
      //TODO: create custom error throw DuplicatedHabitNameError.withName(command.name)
    }

    const remindersCount = this.reminderrepository.countByHabitId(
      command.habitId,
    )

    if (remindersCount >= 3) {
      console.log(
        'You have reached the maximum number of reminders for this habit',
      )
      //TODO: throw new BadRequestException('Ya has alcanzado el número máximo de recordatorios permitidos para este hábito.',)
    }

    // Verificar si hay un recordatorio duplicado para el mismo hábito y hora
    const duplicateReminder = this.reminderrepository.findByHabitIdAndTime(
      command.habitId,
      command.time,
    )
    if (duplicateReminder) {
      console.log('You have duplicated reminder for the same habit and time')
      //TODO: throw new BadRequestException('Ya has alcanzado el número máximo de recordatorios permitidos para este hábito.',)
    }

    const reminder = Reminder.create(
      command.userId,
      command.habitId,
      command.message,
      command.time,
    )
    this.reminderrepository.save(reminder)
  }
}

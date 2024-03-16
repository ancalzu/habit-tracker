import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReminderModel } from '../database/models/reminder.models'
import { ReminderRepository } from 'src/core/domain/reminder/reminder.repository'
import { Reminder } from 'src/core/domain/reminder/reminder'

@Injectable()
export class ReminderInMemoryRepository implements ReminderRepository {
  constructor(
    @InjectRepository(ReminderModel)
    private reminderRepository: Repository<ReminderModel>,
  ) {}

  save(reminder: Reminder): void {
    const reminderModel = new ReminderModel(
      reminder.id,
      reminder.habitId,
      reminder.state,
      reminder.message,
      reminder.time,
    )
    this.reminderRepository.save(reminderModel)
  }

  countByHabitId(habitId: string): number {
    const countReminder = this.reminderRepository.find({
      where: { habitId: habitId },
    })
    console.log(countReminder)
    return 1
  }

  findByHabitIdAndTime(habitId: string, time: string): boolean | undefined {
    const reminder = this.reminderRepository.find({
      where: { habitId: habitId, time: time },
    })
    console.log(reminder)
    return true
  }
}

import { Schedule } from './schedule'
import { HabitId } from './habit.id'
import { Name } from './name'
import { HabitCreateDate } from './createDate'
import { HabitupdateDate } from './updateDate'

export class Habit {
  private constructor(
    readonly id: HabitId,
    readonly name: Name,
    readonly schedule: Schedule,
    readonly userId: string,
    readonly createDate: HabitCreateDate,
    readonly updateDate: HabitupdateDate,
  ) {}

  static create(
    id: string,
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    createDate = new Date(),
    updateDate = new Date(),
  ): Habit {
    const habitId = HabitId.create(id)
    const habitName = Name.create(name)
    const schedule = Schedule.create(frequency, duration, restTime)
    const habitCreateDate = HabitCreateDate.create(createDate)
    const habitupdateDate = HabitupdateDate.create(updateDate)

    return new Habit(
      habitId,
      habitName,
      schedule,
      userId,
      habitCreateDate,
      habitupdateDate,
    )
  }
}

import { HabitId } from './habit.id'
import { Name } from './name'

export class Habit {
  public constructor(
    readonly id: string,
    readonly name: Name,
    readonly frequency: number,
    readonly duration: number,
    readonly restTime: number,
    readonly userId: string,
    readonly createDate: Date,
    readonly updateDate: Date,
    readonly wearableDeviceId: string,
    public status: string,
  ) {}

  static create(
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    wearableDeviceId: string,
    status: string,
  ): Habit {
    const habitId = HabitId.generate()
    const habitName = Name.create(name)
    const frequencyHabit = frequency
    const durationHabit = duration
    const restTimeHabit = restTime
    const userIdHabit = userId
    const habitCreateDate = new Date()
    const habitupdateDate = new Date()
    const wearableDeviceIdHabit = wearableDeviceId
    const statusHabit = status
    return new Habit(
      habitId,
      habitName,
      frequencyHabit,
      durationHabit,
      restTimeHabit,
      userIdHabit,
      habitCreateDate,
      habitupdateDate,
      wearableDeviceIdHabit,
      statusHabit,
    )
  }
}

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
  ) {}

  static create(
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    createDate = new Date(),
    updateDate = new Date(),
  ): Habit {
    const habitId = HabitId.generate()
    const habitName = Name.create(name)
    const frequencyHabit = frequency
    const durationHabit = duration
    const restTimeHabit = restTime
    const userIdHabit = userId
    const habitCreateDate = createDate
    const habitupdateDate = updateDate

    return new Habit(
      habitId,
      habitName,
      frequencyHabit,
      durationHabit,
      restTimeHabit,
      userIdHabit,
      habitCreateDate,
      habitupdateDate,
    )
  }

  //TODO: FROM PRIMITIVES FOR ACCESS
}

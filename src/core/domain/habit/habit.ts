import { AggregateRoot } from '../aggregateRoot'
import { HabitId } from './habit.id'
import { Name } from './name'
import { Reminder } from '../reminder/reminder'
import { Progress } from '../progress/progress'
import { WearableService } from '../service/WearableService'
import { ProgressWasCreatedEvent } from '../progress/progressWasCreatedEvent'
import { ReminderId } from '../reminder/reminderId'
import { ReminderWasCreatedEvent } from '../reminder/reminderWasCreatedEvent'
import { ReminderState } from '../../application/constants/reminder-constant'
export class Habit extends AggregateRoot {
  readonly id: HabitId
  readonly name: Name
  readonly frequency: number
  readonly duration: number
  readonly restTime: number
  readonly userId: string
  readonly createDate: Date
  readonly updateDate: Date
  readonly wearableDeviceId: string
  public status: boolean
  private progress: Progress[] = []
  private reminders: Reminder[] = []

  public constructor(
    id: HabitId,
    name: Name,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    createDate: Date,
    updateDate: Date,
    wearableDeviceId: string,
    status: boolean,
  ) {
    super()
    this.id = id
    this.name = name
    this.frequency = frequency
    this.duration = duration
    this.restTime = restTime
    this.userId = userId
    this.createDate = createDate
    this.updateDate = updateDate
    this.wearableDeviceId = wearableDeviceId
    this.status = status
  }

  static create(
    id: HabitId,
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    wearableDeviceId: string,
    status: boolean,
  ): Habit {
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
      id,
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

  private isWearableDeviceValidated(wearableService: WearableService): boolean {
    return wearableService.execute(this.wearableDeviceId)
  }

  isActive(): boolean {
    return !this.status
  }

  public addProgress(habitId: string, date: Date): void {
    const progress = Progress.create(habitId, date)
    this.progress.push(progress)

    this.recordEvent(ProgressWasCreatedEvent.fromProgress(progress))
  }

  public addReminder(
    id: ReminderId,
    habitId: string,
    message: string,
    state: typeof ReminderState,
    date: Date,
  ): void {
    const reminder = Reminder.create(id, habitId, message, state, date)
    this.reminders.push(reminder)

    this.recordEvent(ReminderWasCreatedEvent.fromReminder(reminder))
  }

  public remove(): Habit {
    this.status = true
    return this
  }
}

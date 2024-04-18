import { AggregateRoot } from '../aggregateRoot'
import { HabitId } from './habit.id'
import { Name } from './name'
import { Reminder, ReminderState } from './reminder'
import { ProgressRecord } from './progressRecord'
import { ProgressRecordId } from './progressRecordId'
import { WearableService } from '../services/WearableService'
import { ProgressRecordWasCreatedEvent } from './progressRecordWasCreatedEvent'
import { ReminderId } from './reminderId'
import { InvalidRemainderError } from './invalidRemaindersNumberError'
import { ReminderWasCreatedEvent } from './reminderWasCreatedEvent'
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
  private progressRecord: ProgressRecord[] = []
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
    status: string,
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
    id: string,
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
    wearableDeviceId: string,
    status: string,
  ): Habit {
    const habitId = HabitId.create(id)
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

  private isWearableDeviceValidated(wearableService: WearableService): boolean {
    return wearableService.execute(this.wearableDeviceId)
  }

  private isReminderDuplicated(time: Date): boolean {
    return this.reminders.some(
      (reminder) =>
        reminder.timestamp.getDate() === time.getDate() &&
        reminder.timestamp.getMonth() === time.getMonth() &&
        reminder.timestamp.getFullYear() === time.getFullYear() &&
        reminder.timestamp.getHours() === time.getHours() &&
        reminder.timestamp.getSeconds() === time.getSeconds(),
    )
  }

  isActive(): boolean {
    return !this.status
  }

  public addProgressRecord(
    id: ProgressRecordId,
    habitId: string,
    date: Date,
    wearableService: WearableService,
    observation: string,
  ): void {
    const progressRecord = ProgressRecord.create(
      id,
      habitId,
      date,
      this.isWearableDeviceValidated(wearableService),
      observation,
    )
    this.progressRecord.push(progressRecord)

    this.recordEvent(
      ProgressRecordWasCreatedEvent.fromProgressRecord(progressRecord),
    )
  }

  public addReminder(
    id: ReminderId,
    habitId: string,
    message: string,
    state: ReminderState,
    timestamp: Date,
  ): void {
    if (this.reminders.length > 3) {
      throw InvalidRemainderError.create()
    }

    if (this.isReminderDuplicated(timestamp)) {
      throw InvalidRemainderError.withTime(timestamp)
    }

    const reminder = Reminder.create(id, habitId, message, state, timestamp)
    this.reminders.push(reminder)

    this.recordEvent(ReminderWasCreatedEvent.fromReminder(reminder))
  }

  public remove(): Habit {
    this.status = true
    return this
  }
}

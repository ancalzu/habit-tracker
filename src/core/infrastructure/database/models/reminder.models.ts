import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('reminder')
export class ReminderModel {
  @PrimaryColumn()
  id: string

  @Column()
  habitId: string

  @Column()
  message: string

  @Column()
  state: string

  @Column()
  time: string

  constructor(id, habitId, stateReminder, messageReminder, timeReminder) {
    this.id = id
    this.habitId = habitId
    this.state = stateReminder
    this.message = messageReminder
    this.time = timeReminder
  }
}

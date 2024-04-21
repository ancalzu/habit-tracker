// src/infrastructure/database/models/user.model.ts
import { HabitId } from 'src/core/domain/habit/habit.id'
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('habit')
export class HabitModel {
  @PrimaryColumn('uuid')
  id: HabitId

  @Column()
  name: string

  @Column()
  frequency: number

  @Column()
  duration: number

  @Column()
  restTime: number

  @Column()
  userId: string

  @Column()
  createDate: Date

  @Column()
  updateDate: Date

  @Column()
  wearableDeviceId: string

  @Column()
  status: boolean

  constructor(
    id: HabitId,
    name: string,
    frecuency: number,
    duration: number,
    restTime: number,
    userId: string,
    createDate: Date,
    updateDate: Date,
    wearableDeviceIdHabit: string,
    status: boolean,
  ) {
    this.id = id
    this.name = name
    this.frequency = frecuency
    this.duration = duration
    this.restTime = restTime
    this.userId = userId
    this.createDate = createDate
    this.updateDate = updateDate
    this.wearableDeviceId = wearableDeviceIdHabit
    this.status = status
  }
}

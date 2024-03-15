// src/infrastructure/database/models/user.model.ts
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('habit')
export class HabitModel {
  @PrimaryColumn('uuid')
  id: string

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

  constructor(
    id: string,
    name: string,
    frecuency: number,
    duration: number,
    restTime: number,
    userId: string,
    createDate: Date,
    updateDate: Date,
    wearableDeviceIdHabit: string,
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
  }
}

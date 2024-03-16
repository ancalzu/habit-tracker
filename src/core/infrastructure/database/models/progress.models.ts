import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('progress')
export class ProgressModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  habitId: string

  @Column()
  registryDate: Date

  constructor(id: string, habitId: string, registryDate: Date) {
    this.id = id
    this.habitId = habitId
    this.registryDate = registryDate
  }
}

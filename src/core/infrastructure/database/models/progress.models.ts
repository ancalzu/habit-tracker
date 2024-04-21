import { ProgressId } from 'src/core/domain/progress/progressId'
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('progress')
export class ProgressModel {
  @PrimaryColumn('uuid')
  id: ProgressId

  @Column()
  habitId: string

  @Column()
  registryDate: Date

  constructor(id: ProgressId, habitId: string, registryDate: Date) {
    this.id = id
    this.habitId = habitId
    this.registryDate = registryDate
  }
}

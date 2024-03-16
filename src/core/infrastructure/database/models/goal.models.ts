import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('goal')
export class GoalModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  userId: string

  @Column()
  completeDate: Date

  constructor(id: string, userId: string, completeDate: Date) {
    this.id = id
    this.userId = userId
    this.completeDate = completeDate
  }
}

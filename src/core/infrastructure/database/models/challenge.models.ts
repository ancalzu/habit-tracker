import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('challenge')
export class ChallengeModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  habitId: string

  @Column()
  description: string

  @Column()
  iterations: string

  @Column()
  startDate: Date

  @Column()
  limitDate: Date

  constructor(
    id: string,
    habitId: string,
    description: string,
    iterations: string,
    startDate: Date,
    limitDate: Date,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = description
    this.iterations = iterations
    this.startDate = startDate
    this.limitDate = limitDate
  }
}

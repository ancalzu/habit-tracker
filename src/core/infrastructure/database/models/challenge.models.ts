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
  iterations: number

  @Column()
  startDate: Date

  @Column()
  limitDate: Date

  @Column()
  status: string

  constructor(
    id: string,
    habitId: string,
    description: string,
    iterations: number,
    startDate: Date,
    limitDate: Date,
    status: string,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = description
    this.iterations = iterations
    this.startDate = startDate
    this.limitDate = limitDate
    this.status = status
  }
}

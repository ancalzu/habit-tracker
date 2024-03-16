import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('archievement')
export class ArchievementModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  challengeId: string

  @Column()
  userId: string

  @Column()
  dateAchieved: Date

  constructor(id: string, habitId: string, userId: string, dateAchieved: Date) {
    this.id = id
    this.challengeId = habitId
    this.userId = userId
    this.dateAchieved = dateAchieved
  }
}

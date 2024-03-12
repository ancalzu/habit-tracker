import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('progress')
export class ProgressModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  habitId: string

  @Column()
  registryDate: Date

  @Column()
  notes: string

  constructor(id: string, registryDate: Date, notes: string) {
    this.id = id
    this.registryDate = registryDate
    this.notes = notes
  }
}

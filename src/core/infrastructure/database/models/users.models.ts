// src/infrastructure/database/models/user.model.ts
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('user')
export class UserModel {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  fullname: string

  constructor(id: string, username: string, fullname: string) {
    this.id = id
    this.username = username
    this.fullname = fullname
  }
}

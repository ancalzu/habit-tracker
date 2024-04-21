// src/infrastructure/database/models/user.model.ts
import { UserId } from 'src/core/domain/user/user.Id'
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('user')
export class UserModel {
  @PrimaryColumn('uuid')
  id: UserId

  @Column()
  username: string

  @Column()
  fullname: string

  @Column()
  email: string

  @Column()
  createDate: Date

  @Column()
  updateDate: Date

  constructor(
    id: UserId,
    username: string,
    fullname: string,
    email: string,
    createDate: Date,
    updateDate: Date,
  ) {
    this.id = id
    this.username = username
    this.fullname = fullname
    this.email = email
    this.createDate = createDate
    this.updateDate = updateDate
  }
}

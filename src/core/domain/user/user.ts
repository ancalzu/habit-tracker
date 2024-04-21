import { UserId } from './user.Id'
export class User {
  constructor(
    readonly id: UserId,
    readonly username: string,
    readonly fullname: string,
    readonly email: string,
    readonly createDate: Date,
    readonly updateDate: Date,
  ) {}

  static create(
    id: UserId,
    username: string,
    fullname: string,
    email: string,
  ): User {
    const createDate = new Date()
    const updateDate = new Date()
    return new User(id, username, fullname, email, createDate, updateDate)
  }
}

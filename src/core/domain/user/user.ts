import { v4 as uuidv4 } from 'uuid'
export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
    readonly email: string,
    readonly createDate: Date,
    readonly updateDate: Date,
  ) {}

  static create(username: string, fullname: string, email: string): User {
    const Userid = uuidv4()
    const Username = username
    const Fullname = fullname
    const Email = email
    const createDate = new Date()
    const updateDate = new Date()

    return new User(Userid, Username, Fullname, Email, createDate, updateDate)
  }
}

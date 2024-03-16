import { User } from '../../domain/user/user'
import { v4 as uuidv4 } from 'uuid'

export class UserMother {
  private id: string = uuidv4()
  private username: string = 'username'
  private fullname: string = 'fullname'
  private email: string = 'email'
  private createDate: Date = new Date()
  private updateDate: Date = new Date()

  withId(id: string) {
    this.id = id
    return this
  }
  withUsername(username: string) {
    this.username = username
    return this
  }
  withFullname(fullname: string) {
    this.fullname = fullname
    return this
  }
  withEmail(email: string) {
    this.email = email
    return this
  }
  withCreateDate(createDate: Date) {
    this.createDate = createDate
    return this
  }
  withUpdateDate(updateDate: Date) {
    this.updateDate = updateDate
    return this
  }

  build(): User {
    return new User(
      this.id,
      this.username,
      this.fullname,
      this.email,
      this.createDate,
      this.updateDate,
    )
  }

  static create(): User {
    return new UserMother().build()
  }
}

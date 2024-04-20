import { UserId } from 'src/core/domain/user/userId'

export class RegisterUserCommand {
  constructor(
    readonly id: UserId,
    readonly username: string,
    readonly email: string,
    readonly fullname: string,
    readonly createDate: Date,
    readonly updateDate: Date,
  ) {}
}

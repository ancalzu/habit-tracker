export class RegisterUserCommand {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly fullname: string,
    readonly createDate: Date,
    readonly updateDate: Date,
  ) {}
}

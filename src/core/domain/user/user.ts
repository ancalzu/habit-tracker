export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
    readonly email: string,
    readonly createDate: Date,
    readonly updateDate: Date,
  ) {}
}

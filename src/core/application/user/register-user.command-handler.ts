import { RegisterUserCommand } from './register-user.command'
import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../../domain/user/user.repository'
import { User } from '../../domain/user/user'
import { UserAlreadyExistsError } from './user-already-exists.error'
import { UserId } from 'src/core/domain/user/userId'

@Injectable()
export class RegisterUserCommandHandler {
  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
  ) {}

  handle(command: RegisterUserCommand) {
    if (this.repository.findByUsername(command.username)) {
      throw UserAlreadyExistsError.withUsername(command.username)
    }
    const userId = UserId.create(command.id)
    const user = User.create(
      userId,
      command.username,
      command.fullname,
      command.email,
    )

    this.repository.saveUser(user)
  }
}

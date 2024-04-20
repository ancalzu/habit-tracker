import { RegisterUserCommandHandler } from '../../application/user/register-user.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { RegisterUserCommand } from '../../application/user/register-user.command'
import { Response } from 'express'
import { catchError } from './error.handler'
import { UserId } from 'src/core/domain/user/userId'

export class CreateUserDto {
  id: string
  username: string
  fullname: string
  email: string
  createDate: Date
  updateDate: Date
}

@Controller()
export class CreateUserController {
  constructor(private commandHandler: RegisterUserCommandHandler) {}

  @Post('user')
  handle(@Body() request: CreateUserDto, @Res() response: Response) {
    const id = UserId.create(request.id)

    try {
      this.commandHandler.handle(
        new RegisterUserCommand(
          id,
          request.username,
          request.fullname,
          request.email,
          request.createDate,
          request.updateDate,
        ),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/users/${id}`).send()
  }
}

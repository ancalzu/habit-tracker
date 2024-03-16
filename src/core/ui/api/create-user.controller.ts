import { RegisterUserCommandHandler } from '../../application/user/register-user.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { RegisterUserCommand } from '../../application/user/register-user.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'

export class CreateUserDto {
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
    const id = uuidv4()

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

import { ListHabitsCommandHandler } from '../../application/habit/list-habits.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { ListHabitByUserCommand } from '../../application/habit/list-habits.command'
import { Response } from 'express'
import { catchError } from './error.handler'

export class ListHabitDto {
  userId: string
}

@Controller()
export class ListHabitController {
  constructor(private commandHandler: ListHabitsCommandHandler) {}

  @Post('habit')
  handle(@Body() request: ListHabitDto, @Res() response: Response) {
    const userId = request.userId

    try {
      this.commandHandler.handle(new ListHabitByUserCommand(userId))
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habit/${userId}`).send()
  }
}

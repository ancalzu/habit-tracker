import { ListHabitsCommandHandler } from '../../application/habit/list-habits.command-handler'
import { Controller, Get, Param, Res } from '@nestjs/common'
import { ListHabitByUserCommand } from '../../application/habit/list-habits.command'
import { Response } from 'express'
import { catchError } from './error.handler'

@Controller()
export class ListHabitController {
  constructor(private commandHandler: ListHabitsCommandHandler) {}

  @Get('habit/:userId')
  handle(@Param('userId') userId: string, @Res() response: Response) {
    try {
      this.commandHandler.handle(new ListHabitByUserCommand(userId))
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/habit/${userId}`).send()
  }
}

import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from './error.handler'
import { AddReminderCommand } from 'src/core/application/reminder/add-reminder.command'
import { AddReminderCommandHandler } from 'src/core/application/reminder/add-reminder.command-handler'

export class AddReminderDto {
  userId: string
  habitId: string
  message: string
  time: string
}

@Controller()
export class AddReminderController {
  constructor(private commandHandler: AddReminderCommandHandler) {}

  @Post('reminder')
  handle(@Body() request: AddReminderDto, @Res() response: Response) {
    const id = uuidv4()

    try {
      this.commandHandler.handle(
        new AddReminderCommand(
          request.userId,
          request.habitId,
          request.message,
          request.time,
        ),
      )
    } catch (error) {
      catchError(error, response)
      return
    }
    response.set('Location', `/reminder/${id}`).send()
  }
}

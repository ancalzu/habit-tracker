import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { catchError } from './error.handler'
import { AddReminderCommand } from 'src/core/application/reminder/add-reminder.command'
import { AddReminderCommandHandler } from 'src/core/application/reminder/add-reminder.command-handler'
import { ReminderId } from 'src/core/domain/reminder/reminderId'

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
    const id = ReminderId.generate()

    try {
      const reminderId = ReminderId.create(id)
      this.commandHandler.handle(
        new AddReminderCommand(
          reminderId,
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
